import { AtpAgent } from "@atproto/api";
import type { AtpPersistSessionHandler } from "@atproto/api";
import { session, timeline } from "$lib/stores";

const SESSION_KEY = 'session';

type Session = Parameters<typeof session.set>[0];
let $session: Session;
session.subscribe(ses => { $session = ses; });

const persistSession: AtpPersistSessionHandler = (_, ses) => {
	if (ses != null) {
		localStorage.setItem(SESSION_KEY, JSON.stringify(ses))
	};
};

const agent = new AtpAgent({ service: 'https://bsky.social', persistSession });

export async function signin() {
  try {
    const identifier = document.querySelector<HTMLInputElement>("input[name=identifier]")?.value;
    if (!identifier) {
      alert("identifier should not be blank.");
      return;
    }
    const password = document.querySelector<HTMLInputElement>("input[name=password]")?.value;
    if (!password) {
      alert("password should not be blank.");
      return;
    }
    const { success, data } = await agent.login({ identifier, password });
    if (!success) {
      alert("signing in failed.");
      return;
    }
    session.set(data);
  } catch(ex) {
    console.error({ error: ex });
    alert("signing in failed.");
    return;
  }
}

export async function resumeSession() {
  try {
    if ($session != null) {
      return
    }
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored == null) {
      return;
    }
    const parsed: Session = JSON.parse(stored);
    if (parsed == null) {
      return;
    }
    const { success } = await agent.resumeSession(parsed);
    if (!success) {
      return;
    }
    session.set(parsed);
  } catch(ex) {
    console.log({ ex });
    alert(ex);
    localStorage.removeItem(SESSION_KEY);
    return;
  }
}

export async function refresh() {
  try {
    const { success, data } = await agent.api.app.bsky.feed.getTimeline();
    if (!success) {
      alert("loading timeline failed.")
      return;
    }
    timeline.set(data);
  } catch(ex) {
    console.error({ error: ex });
    alert("loading timeline failed");
    return;
  }
}

export async function post() {
  try {
    if ($session == null) {
      alert("you must be signed in before post");
      return;
    }
    const text = document.querySelector<HTMLInputElement>("textarea[name=text]")?.value as string;
    const result = await agent.api.app.bsky.feed.post.create(
      { did: $session.did},
      { text, createdAt: new Date().toISOString() }
    );
    document.querySelector<HTMLInputElement>("textarea[name=text]")!.value = "";
    await refresh();
    return result
  } catch(ex) {
    console.error({ error: ex });
    alert("loading timeline failed");
    return;
  }
}
