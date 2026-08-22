import { useState, useRef, useEffect } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function DatePicker({ value, onChange, placeholder = 'Select target date', required = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const containerRef = useRef(null)

  useEffect(() => {
    if (value) {
      const d = new Date(value)
      if (!isNaN(d.getTime())) {
        setCurrentMonth(d.getMonth())
        setCurrentYear(d.getFullYear())
      }
    }
  }, [value])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  // Days calculation
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  const handleSelectDay = (day) => {
    const mm = String(currentMonth + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    const formatted = `${currentYear}-${mm}-${dd}`
    onChange(formatted)
    setIsOpen(false)
  }

  const formatDisplay = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T00:00:00')
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-xl bg-porcelain px-4 py-3.5 text-sm text-left text-ink border border-line transition-all duration-200 hover:border-taupe focus:border-claret focus:outline-none"
      >
        <span className={value ? 'text-ink font-medium' : 'text-taupe'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg className="h-4 w-4 text-taupe shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Hidden input for form validation if required */}
      {required && (
        <input
          type="text"
          required={required}
          value={value}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}

      {/* Calendar Popover */}
      {isOpen && (
        <div
          className="absolute left-0 z-50 mt-2 w-full sm:w-80 rounded-2xl bg-bone p-4 border border-line shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          style={{ background: 'var(--color-bone)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h4
              className="m-0 text-base font-normal text-ink"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {MONTHS[currentMonth]} {currentYear}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-porcelain-2 text-ink hover:bg-line transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-porcelain-2 text-ink hover:bg-line transition-colors"
              >
                ›
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 pt-3 text-center">
            {DAYS.map((d) => (
              <span key={d} className="text-[0.68rem] font-semibold text-taupe uppercase">
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 pt-2">
            {/* Prev month fill */}
            {[...Array(firstDayIndex)].map((_, i) => (
              <div
                key={`prev-${i}`}
                className="flex h-8 w-8 items-center justify-center text-xs text-taupe/40"
              >
                {daysInPrevMonth - firstDayIndex + i + 1}
              </div>
            ))}

            {/* Current month days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1
              const mm = String(currentMonth + 1).padStart(2, '0')
              const dd = String(day).padStart(2, '0')
              const dateStr = `${currentYear}-${mm}-${dd}`
              const isSelected = value === dateStr
              const isToday = dateStr === todayStr

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`flex h-8 w-8 mx-auto items-center justify-center rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-claret text-porcelain shadow-sm scale-105'
                      : isToday
                      ? 'border border-claret text-claret font-semibold hover:bg-porcelain-2'
                      : 'text-ink hover:bg-porcelain-2'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Bottom Actions */}
          <div className="mt-3 flex items-center justify-between border-t border-line pt-2 text-xs">
            <button
              type="button"
              onClick={() => {
                onChange(todayStr)
                setIsOpen(false)
              }}
              className="text-claret font-medium hover:underline"
            >
              Select Today
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
                className="text-taupe hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
