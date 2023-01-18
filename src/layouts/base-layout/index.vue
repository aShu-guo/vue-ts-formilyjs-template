<script lang="ts">
import { RouterView } from 'vue-router';

export default {
  setup(_props, { attrs, slots }) {
    return () => {
      return h(RouterView, { ...attrs }, slots);
    };
  },
};
</script>
