import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bounceTransition } from '../config/animations';

export default function ChatBot() {
    const [messages, setMessages] = useState([{ role: 'assistant', content: '任何问题都可以问我！' }]);
    const [loadingState, setLoadingState] = useState(false);
    const [replyStart, setReplyStart] = useState(false);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // 滚动到底部（直接操作容器 scrollTop，避免 scrollIntoView 冒泡影响父级 motion.div）
    useEffect(() => {
        if (messagesEndRef.current) {
            requestAnimationFrame(() => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
                }
            });
        }
    }, [messages, loadingState]);

    async function fetchReply(messages, onChunk) {
        const info = {
            url: 'https://api.deepseek.com',
            apiKey: 'sk-d73e39b02b054d73aec2ed2ad75c06f1',
            // apiKey: 'sk-205d2441819249609681917725194164',
        };

        const data = {
            model: 'deepseek-chat',
            messages: messages,
            stream: true,
            max_tokens: 2048,
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            frequency_penalty: 0.5,
            n: 1,
            response_format: {
                type: 'text',
            },
        };

        const response = await fetch(info.url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${info.apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // 留着最后一行（可能不完整）到下次拼接

            for (const line of lines) {
                if (line.trim() === '') continue;
                if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6);
                    if (dataStr.trim() === '[DONE]') {
                        return; // 数据流结束
                    }
                    try {
                        const parsed = JSON.parse(dataStr);
                        const content = parsed.choices[0]?.delta?.content;
                        if (content) {
                            onChunk(content);
                        }
                    } catch (e) {
                        // 忽略 JSON 解析错误（分片可能带来的不完整问题）
                    }
                }
            }
        }
    }

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loadingState) return;
        setInput('');
        const newMessages = [...messages, { role: 'user', content: text }];
        setMessages(newMessages);
        setLoadingState(true);
        setReplyStart(false);

        try {
            await fetchReply(newMessages, (chunk) => {
                setReplyStart(true);
                setMessages((prev) => {
                    const updated = [...prev];
                    const lastMsg = updated[updated.length - 1];

                    if (lastMsg.role !== 'assistant') {
                        // 收到第一个 chunk，添加新的 assistant 消息
                        updated.push({ role: 'assistant', content: chunk });
                    } else {
                        // 继续追加 chunk
                        updated[updated.length - 1] = {
                            ...lastMsg,
                            content: lastMsg.content + chunk,
                        };
                    }
                    return updated;
                });
            });
        } catch (err) {
            console.error(err);
            setMessages((prev) => {
                const updated = [...prev];
                // 因为报错前还没有添加过 assistant 回复，所以这里需要 push 新的消息，而不是覆盖最后一条（否则会把用户的提问覆盖掉）
                updated.push({ role: 'assistant', content: '请稍后再试。' });
                return updated;
            });
        } finally {
            setLoadingState(false);
            setReplyStart(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden w-96">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-400 tracking-widest uppercase font-light">大眼睛</span>
            </div>

            <div
                ref={messagesEndRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                style={{ scrollBehavior: 'smooth' }}
            >
                <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{ transformOrigin: 'bottom center' }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                    ${
                                        msg.role === 'user'
                                            ? 'bg-white/10 text-gray-100 rounded-br-sm'
                                            : 'bg-white/5 text-gray-300 rounded-bl-sm border border-white/5'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}

                    {loadingState && !replyStart && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{ transformOrigin: 'bottom center' }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-gray-500"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-4 py-3 border-t border-white/10 flex gap-2 items-end">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything"
                    rows={1}
                    className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-white/20 transition-colors leading-relaxed max-h-28 overflow-y-auto"
                    style={{ fieldSizing: 'content' }}
                />
                <motion.button
                    onClick={handleSend}
                    disabled={loadingState || !input.trim()}
                    whileTap={{ scale: 0.92 }}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center transition-colors border border-white/10 flex-shrink-0"
                >
                    <svg className="w-4 h-4 text-gray-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
}
