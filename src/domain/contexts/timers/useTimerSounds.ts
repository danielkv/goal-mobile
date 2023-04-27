import { RefObject, useEffect, useRef } from 'react'

import { loadTimerSoundsUseCase } from './loadTimerSounds'
import { Audio } from 'expo-av'

type UseTimerSounds = [RefObject<Audio.Sound | null>, RefObject<Audio.Sound | null>, RefObject<Audio.Sound | null>]

export function useTimerSoundsRef(): UseTimerSounds {
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

    return [beepSoundRef, startSoundRef, finishSoundRef]
}
