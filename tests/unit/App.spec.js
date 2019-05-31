import { mount } from "@vue/test-utils";
import App from "../../src/App";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("<App />", () => {
  it("should render without crashing", () => {
    const wrapper = mount(App, {
      stubs: {
        ColorTool: "<div class='color-tool'></div>"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
