/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from '@/composables/useChat';

describe('useChat', () => {
  test('add message correctly when onMessage is called', async () => {
    const text = 'Hola Mundo';

    const { messages, onMessage } = useChat();

    await onMessage(text);

    expect(messages.value.length).toBe(1);
    expect(messages.value[0].itsMine).toBe(true);
    expect(messages.value[0].message).toBe(text);
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    });
  });

  test('add nothing if text is empty', async () => {
    const text = '';

    const { messages, onMessage } = useChat();

    await onMessage(text);

    expect(messages.value.length).toBe(0);
  });

  test('gets the response correctly when message ends with "?"', async () => {
    const text = '¿Cómo estás?';

    const { messages, onMessage } = useChat();

    await onMessage(text);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const [myMessage, theResponse] = messages.value;

    expect(messages.value.length).toBe(2);
    expect(theResponse.itsMine).toBe(false);
    expect(theResponse).toEqual({
      id: expect.any(Number),
      image: expect.any(String),
      itsMine: false,
      message: expect.any(String),
    });
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    });
  });

  test('mock response - fetch API', async () => {
    const mockResponse = { answer: 'yes', image: 'example.gif' };

    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }));

    const text = '¿Cómo estás?';

    const { messages, onMessage } = useChat();

    await onMessage(text);

    await new Promise((resolve) => setTimeout(resolve, 1600));

    const [, theResponse] = messages.value;

    expect(theResponse).toEqual({
      id: expect.any(Number),
      image: mockResponse.image,
      itsMine: false,
      message: mockResponse.answer,
    });
  });
});
