<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/useI18n';
  export default defineComponent({
    setup() {
      const { t } = useI18n();
      const changeTheme = () => {
        // setThemeToken({
        //   colorPrimary: 'red',
        // });
      };
      return () => (
        <div>
          <Button type={'primary'} onClick={changeTheme}>
            切换主题色
          </Button>
          {t('layout.header.home')}
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
