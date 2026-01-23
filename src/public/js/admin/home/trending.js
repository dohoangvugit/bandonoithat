document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.trending-item'))
  const inner = document.getElementById('trendingInner')

  if (!items.length) return

  // xoá nội dung cũ SAU khi đã lấy items
  inner.innerHTML = ''

  const ITEMS_PER_SLIDE = 4

  for (let i = 0; i < items.length; i += ITEMS_PER_SLIDE) {
    const slide = document.createElement('div')
    slide.classList.add('carousel-item')
    if (i === 0) slide.classList.add('active')

    const row = document.createElement('div')
    row.className = 'row g-3'

    items.slice(i, i + ITEMS_PER_SLIDE).forEach(item => {
      item.classList.remove('d-none')
      item.classList.add('col-12', 'col-md-3')
      row.appendChild(item)
    })

    slide.appendChild(row)
    inner.appendChild(slide)
  }
})
