import languages, {initialState} from ".."

describe("languages reducer", () => {
  it("should return the initial state", () => {
    expect(languages(undefined, {})).toEqual(initialState)
    expect(languages(undefined, {})).toMatchSnapshot()
  })
  it("should handle GET_POST_SUCCESS", () => {})
  it("should handle UPDATE_POST_SUCCESS", () => {})
  it("should handle GET_POST_FAIL", () => {})
  it("should handle GET_POST_START", () => {})
})
