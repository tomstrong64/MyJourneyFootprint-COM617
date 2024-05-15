import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InformationPage from '@/views/Information.vue';
import HeaderNavBar from '@/components/AppHeader.vue';
import FooterComponent from '@/components/AppFooter.vue';

describe('InformationPage', () => {
  const wrapper = mount(InformationPage, {
    global: {
      components: {
        'HeaderNavBar': HeaderNavBar,
        'FooterComponent': FooterComponent,
      },
    },
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

  // Test the content of the page heading
  it('displays the correct page heading', () => {
    const heading = wrapper.find('h2');
    expect(heading.text()).toBe('Understanding Carbon Impact & Sustainable Practices');
  });

// Test the content of the page paragraphs
it('displays the correct paragraphs', () => {
    const paragraphs = wrapper.findAll('p');
    const expectedTexts = [
      /Carbon dioxide \(CO2\) emissions from human activities\s+significantly impact our environment and climate.\s+Here's what you need to know:/,
      /By understanding the impact of carbon emissions and adopting sustainable practices,\s+we can work towards a healthier planet for current and future generations./,
    ];
    paragraphs.forEach((paragraph, index) => {
      expect(paragraph.text()).toMatch(expectedTexts[index]);
    });
  });

  // Test the presence of the list items in the "Impact of Carbon Emissions" section
  it('renders the correct list items for the "Impact of Carbon Emissions" section', () => {
    const impactListItems = wrapper.findAll('.impact-list-item');
    const expectedItems = [
      'Global Climate Change',
      'Air Pollution',
      'Ocean Acidification',
      'Biodiversity Loss',
    ];
    impactListItems.forEach((item, index) => {
      expect(item.text()).toBe(expectedItems[index]);
    });
  });

  // Test the presence of the list items in the "Sustainable Practices" section
  it('renders the correct list items for the "Sustainable Practices" section', () => {
    const sustainableListItems = wrapper.findAll('.sustainable-list-item');
    const expectedItems = [
      'Renewable Energy',
      'Energy Efficiency',
      'Public Transportation',
      'Plant-Based Diet',
      'Waste Reduction',
      'Afforestation',
      'Policy Advocacy',
    ];
    sustainableListItems.forEach((item, index) => {
      expect(item.text()).toBe(expectedItems[index]);
    });
  });
});
