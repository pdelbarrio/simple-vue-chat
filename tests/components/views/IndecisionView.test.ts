import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import IndecisionView from '@/views/IndecisionView.vue';
import { mount } from '@vue/test-utils';

describe('<IndecisionView/>', () => {
  test('renders chat messages and message box correctly', () => {
    const wrapper = mount(IndecisionView);

    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true);
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true);
  });
});
