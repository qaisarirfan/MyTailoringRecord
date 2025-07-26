import navigation, {initialState} from ".."

describe("navigation reducer", () => {
  it("should return the initial state", () => {
    expect(navigation(undefined, {})).toEqual(initialState)
    expect(navigation(undefined, {})).toMatchSnapshot()
  })
  it("should handle GET_POST_SUCCESS", () => {})
  it("should handle UPDATE_POST_SUCCESS", () => {})
  it("should handle GET_POST_FAIL", () => {})
  it("should handle GET_POST_START", () => {})
})
