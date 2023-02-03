<template>
  <a-form :model="partA" :label-col="{ style: { width: '50px' } }" :wrapper-col="{ span: 24 }">
    <a-card title="a区伤害（直接显示在面板上）">
      <a-row type="flex" justify="space-between">
        <a-col :span="5">
          <a-form-item label="辉光">
            <a-input-number v-model:value="partA.glow" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="品质">
            <a-input-number v-model:value="partA.ability" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="圣物">
            <a-input-number v-model:value="partA.sacred" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="沸血">
            <a-input-number v-model:value="partA.bloodboil" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col :span="5">
          <a-form-item label="魔爆">
            <a-input-number v-model:value="partA.magicExplosion" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="武器">
            <a-input-number v-model:value="partA.weapon" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="精炼">
            <a-input-number v-model:value="partA.refine" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="食物">
            <a-input-number v-model:value="partA.food" :min="1" addon-after="%" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between">
        <a-col :span="10">
          <a-form-item
            label="脱掉除武器之外的装备后的面板数值"
            :label-col="{ style: { width: '245px' } }"
            :wrapper-col="{ span: 24 }"
          >
            <a-input-number v-model:value="partA.food" :min="1" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="基础面板数值" :label-col="{ style: { width: '100px' } }" :wrapper-col="{ span: 24 }">
            {{ 123 }}
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
  </a-form>
</template>
<script lang="ts">
export default {
  name: 'PartA',
};
</script>
<script setup lang="ts">
export interface PartAData {
  glow?: number; // 辉光
  ability?: number; // 品质
  sacred?: number; // 圣物
  bloodboil?: number; // 沸血
  magicExplosion?: number; // 魔爆
  weapon?: number; // 武器
  refine?: number; // 精炼
  food?: number; // 食物
}

// A区伤害
const partA: PartAData = reactive({});
partA.food = 123;

console.log(toRaw(partA));
</script>

<style scoped></style>
