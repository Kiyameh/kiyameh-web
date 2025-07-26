import {useState} from 'react'
import style from './Playground.module.css'
import Grapper from '@/components/package/Grapper'
import {Bell, Info, MessageCircleHeart, Palette} from 'lucide-react'

export default function GrapperPlayground() {
  const [variant, setVariant] = useState<'static' | 'spotlight' | 'sticky'>(
    'static'
  )
  const [mode, setMode] = useState<'border' | 'solid' | 'ghost'>('border')

  const [borderWidth, setBorderWidth] = useState('2px')
  const [borderRadius, setBorderRadius] = useState('16px')

  return (
    <section className={style.section}>
      {/* Selectors */}
      <header className={style.controls}>
        <fieldset>
          <legend>Variante:</legend>
          <label>
            <input
              type="radio"
              name="variant"
              value="static"
              checked={variant === 'static'}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
            />
            Static
          </label>
          <label>
            <input
              type="radio"
              name="variant"
              value="spotlight"
              checked={variant === 'spotlight'}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
            />
            Spotlight
          </label>
          <label>
            <input
              type="radio"
              name="variant"
              value="sticky"
              checked={variant === 'sticky'}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
            />
            Sticky
          </label>
        </fieldset>
        <fieldset>
          <legend>Modo:</legend>
          <label>
            <input
              type="radio"
              name="mode"
              value="border"
              checked={mode === 'border'}
              onChange={(e) => setMode(e.target.value as typeof mode)}
            />
            Border
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="solid"
              checked={mode === 'solid'}
              onChange={(e) => setMode(e.target.value as typeof mode)}
            />
            Solid
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="ghost"
              checked={mode === 'ghost'}
              onChange={(e) => setMode(e.target.value as typeof mode)}
            />
            Ghost
          </label>
        </fieldset>
        <div>
          Ancho borde:
          <label>
            <input
              type="range"
              min={1}
              max={5}
              value={parseInt(borderWidth)}
              onChange={(e) => setBorderWidth(`${e.target.value}px`)}
            />
            <span>{borderWidth}</span>
          </label>
        </div>
        <div>
          Radio borde:
          <label>
            <input
              type="range"
              min={0}
              max={32}
              value={parseInt(borderRadius)}
              onChange={(e) => setBorderRadius(`${e.target.value}px`)}
            />
            <span>{borderRadius}</span>
          </label>
        </div>
      </header>

      {/* Showcase */}
      <main className={style.showcase}>
        <Grapper
          variant={variant}
          mode={mode}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
        >
          <div className={style.chip}>
            <Palette size={16} />
            I`m a chip
          </div>
        </Grapper>
        <Grapper
          variant={variant}
          mode={mode}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
        >
          <button className={style.button}>
            <Bell size={20} />
            I`m a button
          </button>
        </Grapper>
        <Grapper
          variant={variant}
          mode={mode}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
        >
          <div className={style.card}>
            <Info size={36} />
            I`m a card, with a so long text and a button inside
            <Grapper
              mode={mode === 'solid' ? 'ghost' : 'solid'}
              borderRadius={borderRadius}
              borderWidth={borderWidth}
            >
              <button className={style.button}>
                <MessageCircleHeart size={24} />
                I'm button
              </button>
            </Grapper>
          </div>
        </Grapper>
      </main>
    </section>
  )
}
