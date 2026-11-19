'use client';

import { Eye, EyeOff, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { preload } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { observeMotionVisibility } from './observeMotionVisibility';
import styles from './HeroVideo.module.css';

const poster = '/images/redza_fotos/optimized/redza-hero-operacion-poster.webp';
const posterBase = '/images/redza_fotos/optimized/redza-hero-poster';
const posterSources = `${posterBase}-384.avif 384w, ${posterBase}-480.avif 480w`;
const posterSizes = '(max-width: 520px) calc(100vw - 30px), (max-width: 900px) min(680px, 100vw - 36px), 50vw';
const movie = '/images/redza_fotos/optimized/redza-hero-operacion-light.mp4';

function playVideo(video: HTMLVideoElement) {
  if (!video.hasAttribute('src')) video.src = movie;
  // Autoplay can be blocked; leave the play button available for a user gesture.
  void video.play().catch(() => undefined);
}

export default function HeroVideo() {
  // The preload and picture must select exactly the same resource, including on high-DPR phones.
  preload(`${posterBase}-480.avif`, { as: 'image', type: 'image/avif', imageSrcSet: posterSources, imageSizes: posterSizes, fetchPriority: 'high' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClear, setIsClear] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const intent = useRef<'auto' | 'play' | 'pause'>('auto');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wideViewport = window.matchMedia('(min-width: 901px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;

    const syncPlayback = () => {
      const wantsPlayback = intent.current === 'play' ||
        (intent.current === 'auto' && wideViewport.matches && !motionPreference.matches && !connection?.saveData);
      if (visible && wantsPlayback) playVideo(video);
      else video.pause();
    };

    const onPreferenceChange = () => {
      if (motionPreference.matches && intent.current === 'play') intent.current = 'auto';
      syncPlayback();
    };
    const stopObserving = observeMotionVisibility(video, (nextVisible) => {
      visible = nextVisible;
      syncPlayback();
    });
    motionPreference.addEventListener('change', onPreferenceChange);
    wideViewport.addEventListener('change', syncPlayback);
    return () => {
      stopObserving();
      motionPreference.removeEventListener('change', onPreferenceChange);
      wideViewport.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    intent.current = video.paused ? 'play' : 'pause';
    if (video.paused) playVideo(video);
    else video.pause();
  }

  return (
    <div className={`truck-frame hero-video-frame ${styles.frame}${isClear ? ' is-clear' : ' is-softened'}`} data-playing={playing}>
      <video
        ref={videoRef}
        className="hero-video"
        onPlay={() => setPlaying(true)}
        onPlaying={() => setHasPlayed(true)}
        onPause={() => setPlaying(false)}
        muted
        loop
        playsInline
        width={480}
        height={480}
        preload="none"
        aria-hidden="true"
      />
      {!hasPlayed && <picture>
        <source type="image/avif" srcSet={posterSources} sizes={posterSizes} />
        <Image className="hero-video" src={poster} width={480} height={480}
          alt="" loading="eager" fetchPriority="high" unoptimized />
      </picture>}
      <div className="hero-video-grade" aria-hidden="true" />
      <div className="hero-video-glass" aria-hidden="true" />
      <div className="hero-video-gridlines" aria-hidden="true" />
      <div className="hero-video-status"><span /> Operación en terreno</div>
      <button className="hero-video-control playback-control" type="button" aria-label={playing ? 'Pausar video' : 'Reproducir video'} onClick={togglePlayback}>
        {playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <button className="hero-video-control" type="button" onClick={() => setIsClear((current) => !current)} aria-pressed={isClear} aria-label="Mostrar video con claridad">
        {isClear ? <Eye size={15} /> : <EyeOff size={15} />}
      </button>
      <div className="image-caption"><span>TRANSPORTE DE CARGA / REGISTRO 02</span><strong>CARGA EN MOVIMIENTO</strong></div>
      <div className="hero-video-index" aria-hidden="true"><span>RZ</span><strong>02 / CAMPO</strong></div>
    </div>
  );
}
