import ChatMessages from '@/components/chat/ChatMessages.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import { mount } from '@vue/test-utils';

const messages: ChatMessage[] = [
  {
    id: 1,
    message: 'Hola',
    itsMine: true,
  },
  {
    id: 2,
    message: 'Mundo',
    itsMine: false,
    image: 'http://image.jpg',
  },
];

describe('<ChatMessages />', () => {
  const wrapper = mount(ChatMessages, {
    props: { messages },
  });

  test('renders chat messages correctly', () => {
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });
    expect(chatBubbles.length).toBe(messages.length);
  });
});
