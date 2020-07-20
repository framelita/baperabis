<template>
  <button
    :is="type"
    :class="['btn', propClass]"
    :to="to"
    :href="href"
    :disabled="isDisabled"
    :type="type === 'button' ? type : ''"
    :title="title"
    :target="newTab ? '_blank' : false"
    @click="$emit('click', $event)"
  >
    <span class="content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
/*
  This button can be used as router link, anchor or normal button
  For router link, pass `to`
  For anchor link, pass `href`
*/
export default {
  name: 'BaseButton',
  props: {
    /**
     * Title of the button
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Router link
     */
    to: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Anchor link
     */
    href: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Should this open a new tab
     */
    newTab: {
      type: Boolean,
      default: false,
    },
    isNuxt: { type: Boolean, default: false },
    isPrimary: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
  },
  computed: {
    type() {
      if (this.to) {
        if (this.isNuxt) return 'nuxt-link';
        return 'router-link';
      }
      if (this.href) {
        return 'a';
      }
      return 'button';
    },
    propClass() {
      const classList = [];

      if (this.isPrimary) classList.push('btn--primary');

      if (this.isGhost) classList.push('btn--ghost');

      return classList.join(' ');
    },
  },
};
</script>

<style lang="scss">
// Button
.btn {
  align-items: center;
  background: $grey;
  border: 1px solid $grey;
  border-radius: 3px;
  color: $light;
  cursor: pointer;
  display: inline-flex;
  font-family: $baseFont;
  justify-content: center;
  line-height: 1.2;
  outline: 0;
  padding: 10px 20px;
  text-decoration: none;
  transition: color 0.25s ease-in-out, background 0.25s ease-in-out;

  &:active,
  &.is-active,
  &.is-selected,
  &:focus,
  &:hover {
    transition: background 0.25s ease-in-out;
    background: $greyHover;
    outline: 0;
  }

  &:disabled {
    background: $lightGrey;
    color: $grey;
  }
}

.btn--primary {
  background: $primaryColor;
  color: $light;
  border-color: $primaryColor;

  &.btn--ghost {
    color: $primaryColor;
  }

  &:active,
  &.is-active,
  &.is-selected,
  &:focus,
  &:hover {
    background: $primaryColorHover;

    &.btn--ghost {
      background: lighten($primaryColor, 40%);
    }
  }
}

.btn--ghost {
  background: transparent;
}
</style>
