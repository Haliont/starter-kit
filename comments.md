# Комментарии
1. БЭМ нейминг.
    + Элементы не должны существовать без блоков.
      Блок без элементов - нормас, элемент без блока - плохо.

    + Элементы не должны находиться за пределами блока

      Не правильно:
      ```
        .blockName__elemName
          .blockName
      ```
      Правильно:
      ```
        .blockName
          .blockName__elemName
      ```

    + Модификаторы должны содержать имя самого блока

      Не правильно:
      ```
        .blockName.--modifier
      ```
      Правильно:
      ```
        .blockName.blockName--modifier
      ```

2. Задание внешних отступов/позицианирования для блока.
  Внешние отступы либо позицианирование самом блоку лучше не задавать,
  лучше смиксовать этот блок с элементом родителя и задать
  внешние отступы/позицианирование для него

  Пример:

  blockName.pug
  ```
    mixin blockName()
      .blockName&attributes(attributes)
  ```

  blockName.css
  ```
    .blockName {
      color: #fff;
      background: #000;
      padding: 5px;
      /* margin: 20px; <-- WRONG */
    }
  ```

  parentName.pug
  ```
    include ./blockName.pug

    mixin parentName()
      .parentName
        +blockName()(class="parentName__blockName")
  ```

  parentName.css
  ```
    .parentName {
      /* some styles */
    }

    .parentName__blockName {
      margin: 20px;
    }
  ```

3. Во всех файлах использовать одинаковое кол-во отступов. Предлагаю 2 пробела (редактор можно настроить на кнопку таб).

4. Размеры для текста должны быть единых системах счисления (например rem)

5. ????? Если есть разные шаблоны блока для мобилки и десктопа,
то логика должа находиться в самом блоке.
Примерно так.

```
blockName
├── modules
│   ├── blockNameDesktop
│   │   ├── blockNameDesktop.pug
│   │   ╰── blockNameDesktop.css
│   ╰── blockNameMobile
│       ├── blockNameMobile.pug
│       ╰── blockNameMobile.css
├── blockName.pug
╰── blockName.css
```

blockName.pug
```
include ./modules/blockNameDesktop/blockNameDesktop.pug
include ./modules/blockNameMobile/blockNameMobile.pug

mixin blockName(data)
  if isDesktop
    +blockNameDesktop(data)
  if isMobile
    +blockNameMobile(data)
```
