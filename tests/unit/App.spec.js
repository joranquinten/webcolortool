import { mount } from "@vue/test-utils";
import App from "../../src/App";

describe("<App />", () => {
  const stubVuetify = {
    vApp: "<div class='stub'></div>",
    vAppBar: "<div class='stub'></div>",
    vToolbarTitle: "<div class='stub'></div>",
    vSpacer: "<div class='stub'></div>",
    vBtn: "<div class='stub'></div>",
    vMain: "<div class='stub'></div>",
    vFooter: "<div class='stub'></div>",
    vCardText: "<div class='stub'></div>",
    ColorTool: "<div class='color-tool'></div>"
  };

  it("should render without crashing", () => {
    const wrapper = mount(App, {
      global: {
        stubs: stubVuetify
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
