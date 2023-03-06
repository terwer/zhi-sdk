import { describe, expect, it } from "vitest"
import SiyuanApi from "~/src/siyuanApi"

describe("test siyuanApi", () => {
  it("test version", function () {
    const siyuanApi = new SiyuanApi()
    const version = siyuanApi.VERSION
    console.log(version)
    expect(version).toBeTruthy()
  })
})
