import svgo from 'svgo'
import { JSDOM } from 'jsdom'
import InvalidSvgError from './invalid-svg-error'

type Lazy<T> = T | PromiseLike<T>

type RawSource = Lazy<Iterable<string> | AsyncIterable<string>>

type PromisedType<T> = T extends PromiseLike<infer P> ? P : never

async function parseChunks(source: RawSource) {
  let result: string = ''

  for await (const chunk of await source) {
    result += chunk
  }

  return result
}

function insertResultIntoTemplate(code: PromisedType<ReturnType<svgo['optimize']>>) {
  const dom = new JSDOM(code.data)
  const svg = dom.window.document.querySelector('svg')

  if (!svg) {
    throw new InvalidSvgError(code.data)
  }

  const viewBox = svg.attributes.getNamedItem('viewBox')?.value ?? `0 0 ${code.info.width} ${code.info.height}`


  return `
/* @jsx createElement */
import { createElement } from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default function Icon (props: Omit<SvgIconProps, 'viewBox'>) {
  return <SvgIcon {...props} viewBox="${viewBox}">
    ${svg.innerHTML}
  </SvgIcon>
}
`.trim()
}

export default async function svgToMaterialUi(rawSource: RawSource) {
  const svgoInstance = new svgo()

  return insertResultIntoTemplate(
    await svgoInstance.optimize(
      await parseChunks(rawSource),
    ),
  )
}
