import { useEffect, useRef } from 'react'

import { loadTimerSoundsUseCase } from './loadTimerSounds'
import { Audio } from 'expo-av'

export interface UseTimerSounds {
    playBeep(): void
    playStart(): void
    playFinish(): void
    playRoundChange(): void
}

export function useTimerSounds(): UseTimerSounds {
    const beepSoundRef = useRef<Audio.Sound | null>(null)
    const startSoundRef = useRef<Audio.Sound | null>(null)
    const finishSoundRef = useRef<Audio.Sound | null>(null)

    useEffect(() => {
        async function loadSound() {
            const [beepSound, startSound, finishSound] = await loadTimerSoundsUseCase()

            beepSoundRef.current = beepSound
            startSoundRef.current = startSound
            finishSoundRef.current = finishSound
        }

        loadSound()

        return () => {
            beepSoundRef.current?.unloadAsync()
            startSoundRef.current?.unloadAsync()
            finishSoundRef.current?.unloadAsync()
        }
    }, [])

    function playBeep() {
        beepSoundRef.current?.setVolumeAsync(1)

        beepSoundRef.current?.playFromPositionAsync(0)
    }
    function playStart() {
        startSoundRef.current?.playFromPositionAsync(0)
    }
    function playFinish() {
        finishSoundRef.current?.playFromPositionAsync(0)
    }
    function playRoundChange() {
        startSoundRef.current?.playFromPositionAsync(0)
    }

    return { playBeep, playStart, playFinish, playRoundChange }
}
