/**
 * 给工具类添加条件修饰符和补充说明文字。
 *
 * @param tailwind_classes
 * @param decorations
 * @return {*[]}
 */
export const decorateAndGroupClasses = (tailwind_classes, decorations = ['', 'hover', 'focus', 'md', 'lg']) => {
  let classes = [];

  tailwind_classes.forEach(item => {
    decorations.forEach(decoration => {

      let name = item.name;
      let description = item.description || '';
      if (decoration !== '') {
        name = `${decoration}:${item.name}`;
      }

      if (description !== '') {
        if (decoration === 'md') {
          description = '在中等屏幕尺寸及以上' + description;
        }
        else if (decoration === 'lg') {
          description = `在大屏及以上` + description;
        }
        else if (decoration === 'hover') {
          description = '鼠标悬停时' + description;
        }
        else if (description === 'focus') {
          description = '获取焦点时' + description;
        }
      }

      classes.push({
        name: name,
        description: description,
        group: decoration,
      });
    })
  });

  return classes;
}