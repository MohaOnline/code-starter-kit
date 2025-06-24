'use client';
import React, {useEffect, useRef, useState} from 'react';

import {Button} from "@/components/ui/button";

import { useStatus } from '@/app/lib/atoms';
import {VoicePlayerHowler} from '@/app/lib/VoicePlayerHowler';
import {toast} from "react-toastify";


export default function Example () {
    const [status, setStatus] = useStatus();
    const player = new VoicePlayerHowler();

    // Turn current word to next.
    const nextWord = () => {
        if (status.currentWordIndex < status.words.length - 1) {
            setStatus(prev => ({
                ...prev,
                currentWordIndex: prev.currentWordIndex + 1,
            }))
        }
        else {
            setStatus(prev => ({
                ...prev,
                currentWordIndex: 0,
            }))
        }
    }

    useEffect(() => {
        fetch('/api/notebook-words-english').then(response => response.json())
            .then( json=> {
                setStatus(prev => ({
                    ...prev, // 复制现有状态
                    words: json.data,
                }));
            })
            .catch( err=> {
                console.error(`Fetch API: /api/notebook-words-english`, err.message);
            })
    }, []);

    // 播放单词发音
    useEffect(() => {

        if (status.words.length > 0) {

            let voiceURLs = [];

            const firstChar = status.words[status.currentWordIndex].voice_id_uk[0].toLowerCase();
            const englishURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${status.words[status.currentWordIndex].voice_id_uk}.wav`;

            voiceURLs.push(englishURL);

            player.play(voiceURLs, nextWord);
        }

        return () => player.stop();
    }, [status.currentWordIndex]);

    return (
        <div className="container">
            <Button onClick={() => {
                nextWord();
            }}
            onWheel={()=>{
                nextWord();
            }}
            >
                Next
            </Button>
            <Button onClick={() => {
                player.stop();
            }}>
                Stop
            </Button>
        </div>

    )
}