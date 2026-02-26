import { shallowMount } from "@vue/test-utils";
import ColorTool from "../../../src/components/ColorTool";

describe("<ColorTool />", () => {
  const stubVuetify = {
    vTextarea: "<div class='stub'></div>",
    vRow: "<div class='stub'></div>",
    vCol: "<div class='stub'></div>",
    vSelect: "<div class='stub'></div>",
    ColorList: "<div class='stub'></div>"
  };

  it("should render without crashing", () => {
    const wrapper = shallowMount(ColorTool, {
      global: {
        stubs: stubVuetify
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should format the input when the method is called", () => {
    const wrapper = shallowMount(ColorTool, {
      global: {
        stubs: stubVuetify
      }
    });

    wrapper.vm.formatInput("#fff;  #fff;");
    expect(wrapper.vm.colorInput).toEqual("#fff; #fff;");
  });

  it("should apply the correct sortOrder on the colorList", async () => {
    const wrapper = shallowMount(ColorTool, {
      global: {
        stubs: stubVuetify
      }
    });

    wrapper.vm.colorInput = "#fff; #000; #ccc; ";
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.colorListObject[0].original).toEqual("#fff");
    expect(wrapper.vm.colorListObject[1].original).toEqual("#000");
    expect(wrapper.vm.colorListObject[2].original).toEqual("#ccc");

    wrapper.vm.sortBy = "color";
    wrapper.vm.sortOrder = "ASC";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.colorListObject[0].original).toEqual("#000");
    expect(wrapper.vm.colorListObject[1].original).toEqual("#ccc");
    expect(wrapper.vm.colorListObject[2].original).toEqual("#fff");

    wrapper.vm.sortBy = "color";
    wrapper.vm.sortOrder = "DESC";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.colorListObject[0].original).toEqual("#fff");
    expect(wrapper.vm.colorListObject[1].original).toEqual("#ccc");
    expect(wrapper.vm.colorListObject[2].original).toEqual("#000");

    wrapper.vm.sortBy = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.colorListObject[0].original).toEqual("#fff");
    expect(wrapper.vm.colorListObject[1].original).toEqual("#000");
    expect(wrapper.vm.colorListObject[2].original).toEqual("#ccc");
  });
});
