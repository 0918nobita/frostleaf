export type Ok<T> = { kind: "ok"; value: T };

export type Err<E> = { kind: "err"; error: E };

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ kind: "ok", value });

export const err = <E>(error: E): Err<E> => ({ kind: "err", error });
