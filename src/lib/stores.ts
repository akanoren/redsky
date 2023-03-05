import { writable } from "svelte/store";
import type { AtpAgent } from "@atproto/api";
import type { AtpPersistSessionHandler } from "@atproto/api";

type Session = Parameters<AtpPersistSessionHandler>[1];
type Timeline = Awaited<ReturnType<InstanceType<typeof AtpAgent>['api']['app']['bsky']['feed']['getTimeline']>>['data'];

export const session = writable<Session | null>(null);
export const timeline = writable<Timeline | null>(null);
