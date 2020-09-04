# svg-to-material-ui

transform svg file to material-ui icon

this tool aims to be dead-simple and provide only the transforming/converting feature of `svg` files to `tsx` code,
any kind of formatting (if needed or required) should and can be mad outside of this tool

## usage

```sh
cat file.svg | svg-to-material-ui | prettier --parser typescript
```
