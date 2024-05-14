import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CalculatePage from '@/views/Calculate.vue';
import HeaderNavBar from '@/components/AppHeader.vue';
import FooterComponent from '@/components/AppFooter.vue';


describe('CalculatePage', () => {
  const wrapper = mount(CalculatePage, {
    global: {
      components: {
        'HeaderNavBar': HeaderNavBar,
        'FooterComponent': FooterComponent,
      },
      mocks: {
        $nextTick: () => {}
      }
    },
    data() {
      return {
        formData: {
          selectedCategory: null,
          selectedSubcategory: null,
          selectedFuelType: null,
          vehicles: [],
          fuelTypes: [],
          numPeople: 1,
          start: '',
          end: '',
          distance: '',
          distanceFromMap: ''
        },
        emissionTotal: null,
        emissionsPP: null,
        url: 'mocked_api_url'
      }
    }
  });

  // Test whether the component renders without errors
  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Test the presence of HeaderNavBar component
  it('renders HeaderNavBar component', () => {
    expect(wrapper.findComponent(HeaderNavBar).exists()).toBe(true);
  });

  // Test the presence of FooterComponent component
  it('renders FooterComponent component', () => {
    expect(wrapper.findComponent(FooterComponent).exists()).toBe(true);
  });

    // Test the presence of the form
    it('renders the form', () => {
        const form = wrapper.find('form');
        expect(form.exists()).toBe(true);
        });

});
