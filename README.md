# Frostleaf

```bash
$ asdf install

$ pnpm i

$ cd packages/example
$ pnpm exec ts-eager src/main.ts
{
  tag: 'html',
  attrs: {},
  children: [
    {
      tag: 'head',
      attrs: {},
      children: [
        { tag: 'meta', attrs: { charset: 'utf-8' }, children: [] },
        { tag: 'title', attrs: {}, children: [ 'Generated Page' ] }
      ]
    },
    { tag: 'body', attrs: {}, children: [] }
  ]
}
[
  { tag: 'p', attrs: {}, children: [ 'Hello, world!' ] },
  [ 'foo.client.ts' ]
]
```
