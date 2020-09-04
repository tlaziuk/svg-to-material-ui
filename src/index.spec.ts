import svgToMaterialUI from './index'

describe(svgToMaterialUI, () => {
  it('should emit tsx with proper viewBox', async () => {
    expect(await svgToMaterialUI(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="1280" height="800" id="Flag of Poland (normative)" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect width="1280" height="400" fill="#e9e8e7" />
      <rect width="1280" height="400" fill="#d4213d" y="400" />
    </svg>
    `)).toContain(`viewBox="0 0 1280 800"`)
  })

  it('should transform html attributes to jsx attributes', async () => {
    expect(await svgToMaterialUI(`<svg viewBox="-10 -10 220 120" xmlns="http://www.w3.org/2000/svg">
    <!-- Default value for fill-rule -->
    <polygon fill-rule="nonzero" stroke="red"
     points="50,0 21,90 98,35 2,35 79,90"/>

    <!--
    The center of the shape has two
    path segments (shown by the red stroke)
    between it and infinity. It is therefore
    considered outside the shape, and not filled.
    -->
    <polygon fill-rule="evenodd" stroke="red"
     points="150,0 121,90 198,35 102,35 179,90"/>
  </svg>`)).toContain(`fillRule="evenodd`)
  })

  it('should not contain xmlns', async () => {
    expect(await svgToMaterialUI(`<svg viewBox="-10 -10 220 120" xmlns="http://www.w3.org/2000/svg">
    <!-- Default value for fill-rule -->
    <polygon fill-rule="nonzero" stroke="red"
     points="50,0 21,90 98,35 2,35 79,90"/>

    <!--
    The center of the shape has two
    path segments (shown by the red stroke)
    between it and infinity. It is therefore
    considered outside the shape, and not filled.
    -->
    <polygon fill-rule="evenodd" stroke="red"
     points="150,0 121,90 198,35 102,35 179,90"/>
  </svg>`)).not.toContain(`xmlns`)
  })
})
