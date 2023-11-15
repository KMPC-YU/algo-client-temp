<template>
  <div>
    <div class="fw-bold fs-4 mb-2">
      공지사항 글쓰기
    </div>
    <div class="mt-3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="notice">
        <label class="form-check-label" for="notice">
          공지
        </label>
      </div>
      <div class="form-group">
        <input type="text" v-model="title" class="form-control mt-3 mb-3" id="title" placeholder="글 제목을 입력해주세요." maxlength="50" required>
        <div class="editor" v-if="editor" id="editor">
          <MenuBar className="editor__header" :editor="editor" />
          <EditorContent className="editor__content" :editor="editor" />
        </div>
      </div>
    </div>
    <div class="write-button gap-2">
      <button class="btn btn-secondary" @click="cancel">취소</button>
      <button class="btn btn-primary" @click="submit">작성완료</button>
    </div>
  </div>
</template>

<script>
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

import { useEditor, EditorContent } from '@tiptap/vue-3'
import MenuBar from '@compo/editor/MenuBar.vue'

export default {
  components: {
    EditorContent,
    MenuBar,
  },
  setup() {
    const editor = useEditor({
      content: '',
      extensions: [
        StarterKit,
        Highlight,
        Image,
        TaskItem,
        TaskList,
      ],
    })

    return {
      editor,
    }
  }
}
</script>

<style lang="scss">
.write-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.editor {
  background-color: #FFF;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: 0.375rem;
  color: #0D0D0D;
  display: flex;
  flex-direction: column;
  max-height: 26rem;

  &__header {
    align-items: center;
  //background: #0d0d0d;
    border-bottom: var(--bs-border-width) solid var(--bs-border-color);
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    height: 370px;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #0D0D0D;
    color: #0D0D0D;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  /* Some information about the status */
  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0D0D0D, 0.5);
      border-radius: 50%;
      content: ' ';
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #B9F18D;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0D0D0D;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0D0D0D;
        color: #FFF;
      }
    }
  }
}

/* Basic editor styles */
.ProseMirror:focus {
  outline: none;
}

.ProseMirror {

  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>