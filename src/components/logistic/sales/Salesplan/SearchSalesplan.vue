<template>
  <div>
    <b-button
        variant="primary"
        size="md"
        @click="$emit('add')"
    >
      추가
    </b-button>
    <b-button
          variant="primary"
          size="md"
          @click="$emit('update')"
    >
      수정
    </b-button>
    <b-button
      variant="primary"
      size="md"
      @click="$emit('delete')"
      >
      삭제
    </b-button>
  </div>
</template>
