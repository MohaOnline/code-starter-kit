'use client';

import {HowlerVoicePlayer} from "@/app/lib/components/howlerVoicePlayer";

export  default function Example () {
    let IDs =[
        'a7f3b3c3-28e6-41ec-bfbc-9f621d80f382',
        '5d26a050-cfe9-4b35-b7ef-90749a75cf0e',
        '1eb8e4ad-0083-4239-b8a5-12386e9ccde7',
        'd8074965-5492-451d-96df-a08cd4b46d63',
        'fadd03d1-3884-48a3-86ad-b88f85451a0e',
        '24779223-e9cd-4dd0-aa46-49706c7818cb',
    ];

    for(let i = 0; i < IDs.length; i++){
        const firstChar = IDs[i][0].toLowerCase();
        IDs[i] = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${IDs[i]}.wav`;
    }

    console.log(IDs);

    return (
        <div className="container">

            <HowlerVoicePlayer audioFiles={IDs}
                onComplete={() => {}}
            />
        </div>
    )
}