import { shallowMount } from "@vue/test-utils";
import ColorList from "../../../src/components/ColorList";

describe("<ColorList />", () => {
  const stubVuetify = {
    vContainer: "<div class='stub'></div>",
    vSnackbar: "<div class='stub'></div>",
    vBtn: "<div class='stub'></div>"
  };

  it("should render without crashing", () => {
    const wrapper = shallowMount(ColorList, {
      props: {
        colors: []
      },
      global: {
        stubs: stubVuetify
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should validate the properties", () => {
    const wrapper = shallowMount(ColorList, {
      props: {
        colors: []
      },
      global: {
        stubs: stubVuetify
      }
    });

    const colors = wrapper.vm.$.type.props.colors;

    expect(colors.required).toBeTruthy();
    expect(colors.type).toBe(Array);
    expect(colors.validator && colors.validator("string")).toBeFalsy();
    expect(colors.validator && colors.validator(["invalid array"])).toBeFalsy();
    expect(
      colors.validator &&
        colors.validator([{ hex: "hex", rgb: "rgb", hsl: "hsl", isDark: true }])
    ).toBeTruthy();
  });

  it("should change the snackbar properties when calling the copyToClipboard method", () => {
    const wrapper = shallowMount(ColorList, {
      props: {
        colors: []
      },
      global: {
        stubs: stubVuetify
      }
    });

    wrapper.vm.copyToClipboard("this is passed from the event");
    expect(wrapper.vm.snackbarVisible).toBeTruthy();
    expect(wrapper.vm.snackbarText).toContain("this is passed from the event");
  });
});
