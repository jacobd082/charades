import { writable } from "svelte/store";

export const teamA = writable(0)
export const teamB = writable(0)

export const isTeamATurn = writable(true)