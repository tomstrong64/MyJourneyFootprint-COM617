import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IndexComponent from '@/views/Index.vue';
import HeaderNavBar from '@/components/AppHeader.vue';
import FooterComponent from '@/components/AppFooter.vue';

describe('IndexComponent', () => {
  // Mount the component
  const wrapper = mount(IndexComponent, {
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

  // Test the content of the title
  it('displays the correct title text', () => {
    const title = wrapper.find('h2');
    expect(title.text()).toBe('Join us in our mission to reduce carbon footprints');
  });

  // Test the content of the paragraph
  it('displays the correct paragraph text', () => {
    const paragraph = wrapper.find('p');
    expect(paragraph.text()).toBe(
      'Calculate your carbon footprint now and take the first step towards a more sustainable future.'
    );
  });

  // Test the presence of "Get started" router-link
  it('renders "Get started" router-link', () => {
    const getStartedLink = wrapper.find('[to="/calculate"]');
    expect(getStartedLink.exists()).toBe(true);
  });

  // Test the presence of "Sign Up" router-link
  it('renders "Sign Up" router-link', () => {
    const signUpLink = wrapper.find('[to="/register"]');
    expect(signUpLink.exists()).toBe(true);
  });
});
