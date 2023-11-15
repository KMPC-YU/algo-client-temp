<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" v-if="buttonDisplay" :class="previousButtonDisabled ? 'disabled' : ''">
        <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
      </li>
      <li class="page-item" v-for="page in pageList" :key="page" :class="currentPage === page ? 'active' : ''">
        <a class="page-link" @click="change(page)">{{ page }}</a>
      </li>
      <li class="page-item" v-if="buttonDisplay" :class="nextButtonDisabled ? 'disabled' : ''">
        <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    currentPage: { // 현재 페이지
      type: Number,
      default: 1
    },
    totalPageCount: {  // 총 페이지 (x-page-count)
      type: Number,
    },
    pageDisplayCount: { // 보여줄 페이지 수
      type: Number,
    }
  },
  emits: ['change'],
  setup(props, context) {
    const buttonDisplay = computed(() => props.totalPageCount > 5)  // 총 페이지가 5개 이하면 이전/다음 버튼을 보여주지 않음
    const currentPageGroup = computed(() => Math.ceil(props.currentPage / props.pageDisplayCount))  // 현제 페이지의 그룹 번호
    const lastPageNumber = computed(() => { // 마지막 페이지 번호
      const lastNumber = currentPageGroup.value * props.pageDisplayCount
      if (lastNumber > props.totalPageCount) return props.totalPageCount
      return lastNumber
    })
    const firstPageNumber = computed(() => {  // 첫번째 페이지 번호
      if (lastPageNumber.value === props.totalPageCount) {
        const multipleOfPageDisplayCount = lastPageNumber.value % props.pageDisplayCount === 0
        return multipleOfPageDisplayCount
          ? lastPageNumber.value - props.pageDisplayCount + 1
          : lastPageNumber.value - (lastPageNumber.value % props.pageDisplayCount) + 1
      }
      return lastPageNumber.value - (props.pageDisplayCount - 1)
    })
    const pageList = computed(() => { // 페이지 리스트 (pageDisplayCount = 5라면 [1~5], [6~10]...)
      const list = []
      for (let i = firstPageNumber.value; i <= lastPageNumber.value; i++) {
        list.push(i)
      }
      return list
    })
    const nextButtonDisabled = computed(() => lastPageNumber.value >= props.totalPageCount) // 다음 버튼 비활성화 (마지막 페이지 번호 >= 총 페이지)
    const previousButtonDisabled = computed(() => firstPageNumber.value <= 1) // 이전 버튼 비활성화 (첫번째 페이지 번호 <= 1)

    const change = (clickNumber) => { // 페이지 번호를 클릭하는 경우 실행
      if (clickNumber === props.currentPage) return false
      context.emit('change', clickNumber) // change 라는 이벤트 이름으로 clickNumber 값을 부모 컴포넌트로 올려줌
    }

    const previous = () => {  // 이전 버튼 클릭 시 이전 페이지의 첫번째 번호로 설정
      context.emit('change', firstPageNumber.value - props.pageDisplayCount)
    }

    const next = () => { // 다음 버튼 클릭 시 다음 페이지의 첫번째 번호로 설정
      context.emit('change', lastPageNumber.value + 1)
    }

    return {
      buttonDisplay,
      currentPageGroup,
      lastPageNumber,
      firstPageNumber,
      pageList,
      nextButtonDisabled,
      previousButtonDisabled,
      change,
      previous,
      next,
    }
  }
}
</script>

<style lang="scss" scoped>
.page-item {
  cursor: pointer;
}
</style>