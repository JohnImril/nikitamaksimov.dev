# Insomnia / Feeder case-study evidence

Research date: 2026-11-09. Contributor: JohnImril. Repository: https://github.com/Insomnia-IT/feed.

## Scope and editorial choice

The author-filtered GitHub PR search returned 95 results. The complete title index below was reviewed to identify initiatives beyond the three previously featured changes. Detailed code and review inspection focused on the 22 PRs in the table, including every requested starting point and adjacent iterations. This is not a claim that every line of every PR was audited. The oldest contribution checked (#363) was created and merged on 2024-10-28; the latest selected merged contribution (#1183) was created and merged on 2026-07-05. The page therefore states October 2024–July 2026, without presenting the PR count as impact.

Selected themes are inventory workflows, mobile delivery/rendering, toolchain modernization, and operational rules. These combine repeated work into areas of engineering responsibility and expose useful frontend/backend boundaries. Small style fixes, package bumps, and unrelated maintenance do not become portfolio accomplishments on their own.

## Reference review

Read axek/portfolio's src/components/projects/FeedCaseStudy.tsx, FeedShowcase.tsx, and src/data/projects/en.ts through GitHub. The hosted reference URL could not be fetched by the web tool; the corresponding source establishes its product-first hero, overview, captioned workflow showcase, deliverables, and stack structure. Adapted that storytelling hierarchy, not its styling, prose, UX deliverables, or ownership claims.

No screenshot files were copied. No sanitized, verified production screenshot set was available in this task. The site uses original HTML/CSS diagrams explicitly labeled simplified product/workflow diagrams. They describe product operations, transfer state, data delivery, and kitchen result states; they are not simulated dashboards or production screenshots. No volunteer records, QR values, personal names, or contact details are displayed.

## Reviewed changes

| PR                                                     | Created    | Merged     | Author    |
| ------------------------------------------------------ | ---------- | ---------- | --------- |
| [#573](https://github.com/Insomnia-IT/feed/pull/573)   | 2025-05-08 | 2025-05-10 | JohnImril |
| [#782](https://github.com/Insomnia-IT/feed/pull/782)   | 2025-08-03 | 2026-04-08 | JohnImril |
| [#995](https://github.com/Insomnia-IT/feed/pull/995)   | 2026-04-18 | 2026-05-03 | JohnImril |
| [#687](https://github.com/Insomnia-IT/feed/pull/687)   | 2025-06-18 | 2025-06-18 | JohnImril |
| [#699](https://github.com/Insomnia-IT/feed/pull/699)   | 2025-06-21 | 2025-12-21 | JohnImril |
| [#706](https://github.com/Insomnia-IT/feed/pull/706)   | 2025-06-22 | 2025-06-25 | JohnImril |
| [#1035](https://github.com/Insomnia-IT/feed/pull/1035) | 2026-05-03 | 2026-06-05 | JohnImril |
| [#882](https://github.com/Insomnia-IT/feed/pull/882)   | 2026-02-28 | 2026-03-22 | JohnImril |
| [#1090](https://github.com/Insomnia-IT/feed/pull/1090) | 2026-05-30 | 2026-06-01 | JohnImril |
| [#1091](https://github.com/Insomnia-IT/feed/pull/1091) | 2026-05-30 | 2026-05-31 | JohnImril |
| [#1106](https://github.com/Insomnia-IT/feed/pull/1106) | 2026-06-05 | 2026-06-07 | JohnImril |
| [#1183](https://github.com/Insomnia-IT/feed/pull/1183) | 2026-07-05 | 2026-07-05 | JohnImril |
| [#840](https://github.com/Insomnia-IT/feed/pull/840)   | 2026-01-25 | 2026-02-25 | JohnImril |
| [#859](https://github.com/Insomnia-IT/feed/pull/859)   | 2026-02-15 | 2026-02-27 | JohnImril |
| [#1159](https://github.com/Insomnia-IT/feed/pull/1159) | 2026-06-24 | 2026-06-26 | JohnImril |
| [#1045](https://github.com/Insomnia-IT/feed/pull/1045) | 2026-05-05 | 2026-05-24 | JohnImril |
| [#1127](https://github.com/Insomnia-IT/feed/pull/1127) | 2026-06-14 | 2026-06-21 | JohnImril |
| [#909](https://github.com/Insomnia-IT/feed/pull/909)   | 2026-03-22 | 2026-03-29 | JohnImril |
| [#593](https://github.com/Insomnia-IT/feed/pull/593)   | 2025-05-18 | 2025-05-18 | JohnImril |
| [#1046](https://github.com/Insomnia-IT/feed/pull/1046) | 2026-05-05 | 2026-05-21 | JohnImril |
| [#1176](https://github.com/Insomnia-IT/feed/pull/1176) | 2026-07-01 | Not merged | JohnImril |
| [#1184](https://github.com/Insomnia-IT/feed/pull/1184) | 2026-07-06 | Not merged | JohnImril |

## Claim-to-code notes

### Platform modernization

- #573: root tooling and shared stylelint configuration; CI style checks; Husky/lint-staged. npm ci replaces the older bootstrap script. Lerna/Nx were already present and were updated/configured, not invented here.
- Review discussion in #573 verifies the scanner version file was already generated during Docker builds. The old pre-commit version-file write could therefore be removed. Review also discusses Husky lifecycle behavior and workspace dependencies. Broader style-rule changes were left for follow-up issues #575/#576; do not claim all lint rules were completed here.
- #782: scanner CRA/CRACO/react-scripts removed; Vite config added with base /scanner/, PWA manifest/start URL, aliases, and separate dev/preview commands. Admin Vite configuration, React/Refine integration, TypeScript references, Docker build stages, nginx paths, and environment-variable handling changed too. The admin already used Vite: say scanner migration plus admin modernization, not that this PR first migrated both apps to Vite.
- #995: root build becomes npm-run-all -s build:admin build:scanner with direct workspace invocations. Removes lerna.json, nx.json, dependencies, nx graph and build:since. The removed Nx config enabled build caching; losing that layer is an explicit trade-off. Does not prove faster builds.

### Mobile and initial rendering

- #687: React.memo mobile cards; memoized derived arrival/action data and callbacks; lazy rich-text editor with loading fallback.
- #699: lazy chart modules, dynamic spreadsheet imports, memoized filters/selection callbacks. This is historical iteration; #882 subsequently moves XLSX generation to Django and removes ExcelJS from the frontend. Do not describe ExcelJS as the present architecture.
- #706: mobile useInfiniteList and InfiniteScroll. #859 adds the mobile My brigade path. They provide context for the pagination and coordinator use case preserved in #1035.
- #1035 backend/feeder/serializers.py: VolunteerMobileListSerializer emits id, name, first_name, last_name, is_blocked, direction_head_comment, arrivals.
- #1035 backend/feeder/views/volunteer.py: representation selected only for action=list and mobile=1; queryset.only limits volunteer columns, Prefetch selects arrival columns and orders arrivals. Detail serializer stays on its existing path.
- #1035 mobile list adds mobile=1 to its resource; desktop content moves to a lazy module with Suspense; custom fields load only on desktop; filter lookups become enabled when visible or active; sidebar access-role lookup skips xs. nginx and asset-cache changes also exist, but the case focuses on the data/rendering boundary.
- Important limit: mobile still uses useInfiniteList<VolEntity>, not a dedicated minimal TS interface. The page explicitly acknowledges the gap. Queryset changes do not establish a total query-count or payload-byte measurement.
- Review includes informal local timing discussion. There is no controlled, reproducible production benchmark presented in the case. No percentage or millisecond result is published.

### Inventory operations

- #1090 is frontend integration of existing stock APIs, not authorship of the whole stock backend. api.ts loads volunteer inventory, then position details in parallel and joins by position ID. This incurs a request per inventory position; do not imply a new bulk endpoint or optimized query architecture.
- Separate useVolunteerInventory and useInventoryTransfer hooks isolate fetching from form/mutation state. Query enabled only with a volunteer ID; inventory list includes loading and empty states, query failures show a notification.
- Transfer fixes destination to open profile; source defaults to current actor; changing source clears item/count, changing position resets count; form checks self-transfer and available quantity. POST storage-movements carries position/count/from/to/actor. A successful POST refreshes source and destination through Promise.all; failure produces an error notification, finally clears pending state. Do not infer atomic stock updates, concurrency protection, or server authorization from this frontend code.
- #1091 adds inventory_item lookup filtering and stock-qualified item names to the existing volunteer filter system; does not implement backend filtering itself.
- #1106 adds from/to/item/warehouse names to MovementSerializer, MovementFilter (including source/destination and warehouse/position/item/bin), a warehouse movements tab, volunteer movement history, and frontend types.
- #1183 adds storage_name to issue/return serializers and the matching TS interfaces, corrects item_name to string, creates a discriminated union with historyType and prefixed rowKey, deduplicates transfers by ID, merges four queries, sorts by created_at then ID, and updates loading aggregation. Missing actor IDs fall back to text rather than broken profile links. The merged history uses unpaginated reads; no claim of an immutable, tamper-proof, or indefinitely scalable audit log.

### Business rules and authorization

- #840 adds supervisor form/details integration; #859 adds a mobile My brigade filter. #1159 then replaces general volunteer searching with a scoped supervisor-candidates API and shared frontend hooks.
- #1159 backend/feeder/volunteer_rules.py defines eligible supervisor roles TEAM_LEAD/ORGANIZER/VICE; rejects self-assignment, unsuitable roles, and missing shared service. Candidate endpoint excludes self and deleted records; service heads' candidate scope intersects actor services and rejects unrelated service access.
- RetrieveVolunteerSerializer.validate invokes direction-head and supervisor validators. Service heads cannot change services or access rights through those checked updates and can switch only VOLUNTEER/TEAM_LEAD in the permitted service context. Frontend useSupervisorOptions/useVolunteerRoleEdit reflects these constraints. This is targeted server validation, not an audit of all authorization paths or proof that UI gates secure an API.
- #1045 adds required kitchen selection and kitchen display to group-badge admin forms/list/details and updates frontend contracts. #909 adds supported group-badge volunteer-role selection.
- #1127 adds nullable kitchen ID to scanner GroupBadge and WRONG_KITCHEN to post-scan group badge states. It compares kitchen IDs before normal loading/validation, distinguishes null from mismatch, and includes kitchen assignment in memo dependencies. Client-side behavior only; no claim it enforces a backend security boundary.
- #593 exposes confirmation-based cancellation via DELETE volunteer-group/{groupUuid}/ and removes corresponding local history rows. Useful workflow integration, but less substantial than #1159 for the main narrative; no claim it introduced backend rollback semantics.
- #1046 surfaces backend form errors. It supports the wider operational context but is not elevated into its own initiative.

## Explicit omissions

- #1176 and #1184 were not merged when checked. Excluded their sync/deletion/health/observability claims from shipped impact.
- No claims to platform creation, original architecture, overall UX/design ownership, all scanner work, or the inventory backend as a whole.
- No revenue, adoption, volunteer count, latency percentage, build-speed win, security guarantee, uptime, or controlled production performance measurement.
- The commercial TTI result and commercial content are unchanged. Only the commercial page's now-orphaned public-contributions navigation link changes.

## Full author-filtered discovery index

This is a research inventory, not the website's presentation. Titles are the original GitHub titles; presence here does not imply inclusion or merged status.

- [#363](https://github.com/Insomnia-IT/feed/pull/363) — Возможность банить волонтеров для руководителя локации
- [#372](https://github.com/Insomnia-IT/feed/pull/372) — Отправка данных о блокировке сразу после нажатия и немного рефактора
- [#385](https://github.com/Insomnia-IT/feed/pull/385) — Столбец для выданной порции
- [#388](https://github.com/Insomnia-IT/feed/pull/388) — Правки верстки и рефактор в групповых бейджах
- [#403](https://github.com/Insomnia-IT/feed/pull/403) — Перенос столбца "порция выдана" в таблицу волонтера
- [#404](https://github.com/Insomnia-IT/feed/pull/404) — Правки стилей групповых бейджей
- [#419](https://github.com/Insomnia-IT/feed/pull/419) — Дотянул старые пр
- [#422](https://github.com/Insomnia-IT/feed/pull/422) — Удалены лишние пакеты + npm
- [#424](https://github.com/Insomnia-IT/feed/pull/424) — Обновлены зависимости для админки
- [#426](https://github.com/Insomnia-IT/feed/pull/426) — Правки по raw-loader
- [#427](https://github.com/Insomnia-IT/feed/pull/427) — Вернул кнопку создания волонтера и добавил пагинацию групповых бейджей
- [#429](https://github.com/Insomnia-IT/feed/pull/429) — Получение полных списков в карточке волонтера
- [#431](https://github.com/Insomnia-IT/feed/pull/431) — Скролл и рефакторинг в карточке волонтера
- [#432](https://github.com/Insomnia-IT/feed/pull/432) — Новые графики
- [#436](https://github.com/Insomnia-IT/feed/pull/436) — Правки по react-quill стилям
- [#437](https://github.com/Insomnia-IT/feed/pull/437) — Компонент текстового редактора
- [#438](https://github.com/Insomnia-IT/feed/pull/438) — Рефакторинг и правки типов в админке (убрал any)
- [#501](https://github.com/Insomnia-IT/feed/pull/501) — Исправлен столбчатый график, разделение по времени питания
- [#502](https://github.com/Insomnia-IT/feed/pull/502) — Добавлен отступ для кнопки сохранения групповых бейджей
- [#508](https://github.com/Insomnia-IT/feed/pull/508) — Поправлено отображение пунктов меню и кнопка сохранить в редактировании групповых бейджей
- [#531](https://github.com/Insomnia-IT/feed/pull/531) — Добавил обрезку для комментария в групповых бейджах
- [#532](https://github.com/Insomnia-IT/feed/pull/532) — Исправлена опечатка в имени старшего смены
- [#546](https://github.com/Insomnia-IT/feed/pull/546) — Исправлен переход к карточке волонтера после скана
- [#547](https://github.com/Insomnia-IT/feed/pull/547) — Закрыл доступ к групповым операциям у руководителя локаций
- [#556](https://github.com/Insomnia-IT/feed/pull/556) — Пагинация волонтеров в групповом бейдже
- [#557](https://github.com/Insomnia-IT/feed/pull/557) — Исправлен формат
- [#573](https://github.com/Insomnia-IT/feed/pull/573) — Обновление стека монорепы, общий стайл линтер, обработка коммитов через хаски
- [#593](https://github.com/Insomnia-IT/feed/pull/593) — Отмена групповых операций
- [#611](https://github.com/Insomnia-IT/feed/pull/611) — Исправлен баг добавления волонтера в групповой бейдж
- [#613](https://github.com/Insomnia-IT/feed/pull/613) — Подправил порядок и названия комментариев
- [#641](https://github.com/Insomnia-IT/feed/pull/641) — Счетчик волонтёров в групповом бейдже
- [#642](https://github.com/Insomnia-IT/feed/pull/642) — Исправлена ошибка `Breadcrumb.Item and Breadcrumb.Separator` is deprecated
- [#650](https://github.com/Insomnia-IT/feed/pull/650) — Добавил в карточку волонтера два цвета бейджа
- [#679](https://github.com/Insomnia-IT/feed/pull/679) — Немного адаптива
- [#686](https://github.com/Insomnia-IT/feed/pull/686) — Поправил список групповых бейджей, чтобы не перепрыгивали на пустую страницу
- [#687](https://github.com/Insomnia-IT/feed/pull/687) — Оптимизировано отображение списка волонтеров
- [#696](https://github.com/Insomnia-IT/feed/pull/696) — fix: правка размеров табов
- [#697](https://github.com/Insomnia-IT/feed/pull/697) — Скрыть кнопку сохранения на всех табах кроме основного
- [#699](https://github.com/Insomnia-IT/feed/pull/699) — Оптимизация первого рендера
- [#706](https://github.com/Insomnia-IT/feed/pull/706) — Бесконечный скролл в мобилке для волонтера
- [#779](https://github.com/Insomnia-IT/feed/pull/779) — Исправлено неверное отображение имени юзера после логаута и логина новым
- [#782](https://github.com/Insomnia-IT/feed/pull/782) — Обновлен стек фронта и сканнер на vite
- [#827](https://github.com/Insomnia-IT/feed/pull/827) — fix: Правки для статусов заездов у руководителей локаций
- [#832](https://github.com/Insomnia-IT/feed/pull/832) — fix: Сделал в "кормить часть" значения 0 по умолчанию в полях веган и мясоед
- [#833](https://github.com/Insomnia-IT/feed/pull/833) — fix: Critical Исправлен импорт из библиотеки
- [#840](https://github.com/Insomnia-IT/feed/pull/840) — feat-816 добавил поле "Бригадир" в карточку волонтера
- [#856](https://github.com/Insomnia-IT/feed/pull/856) — Правки по статусам заезда
- [#859](https://github.com/Insomnia-IT/feed/pull/859) — feat-818 добавил тоггл "моя бригада"
- [#861](https://github.com/Insomnia-IT/feed/pull/861) — Тестовый пр по https
- [#882](https://github.com/Insomnia-IT/feed/pull/882) — Убран exceljs с фронта
- [#889](https://github.com/Insomnia-IT/feed/pull/889) — Feat 838: ГРУППОВЫЕ БЕЙДЖИ: 4 Добавление возможности выключения типов питания в групповом бейдже
- [#909](https://github.com/Insomnia-IT/feed/pull/909) — feat-844: Роль в групповом бейдже
- [#920](https://github.com/Insomnia-IT/feed/pull/920) — feat-903: Поля платников в карточке волонтера
- [#921](https://github.com/Insomnia-IT/feed/pull/921) — feat-904: платники в таблице
- [#965](https://github.com/Insomnia-IT/feed/pull/965) — fix-964: поправлена верстка в мобилке
- [#968](https://github.com/Insomnia-IT/feed/pull/968) — fix-967 Привел пагинацию к общему виду
- [#970](https://github.com/Insomnia-IT/feed/pull/970) — fix-969 Починил кнопку приступил в мобильном списке волонтеров
- [#971](https://github.com/Insomnia-IT/feed/pull/971) — feat-905: Платники в истории изменений
- [#972](https://github.com/Insomnia-IT/feed/pull/972) — Правки под реальные типы бэка
- [#990](https://github.com/Insomnia-IT/feed/pull/990) — Вернул сваггер и обновил уязвимые пакеты
- [#991](https://github.com/Insomnia-IT/feed/pull/991) — feat: выбор даты и времени для мобилки
- [#992](https://github.com/Insomnia-IT/feed/pull/992) — Удалил неиспользуемые алиасы в сканнере
- [#993](https://github.com/Insomnia-IT/feed/pull/993) — Удален неиспользуемый пакет rimraf
- [#994](https://github.com/Insomnia-IT/feed/pull/994) — fix: Починил локализацию
- [#995](https://github.com/Insomnia-IT/feed/pull/995) — Обновлен линтер в проекте и убрал lerna c nx
- [#1013](https://github.com/Insomnia-IT/feed/pull/1013) — fix: починка таймзон для экспорта
- [#1014](https://github.com/Insomnia-IT/feed/pull/1014) — feat: добавлено еще немного кэша в докер конфиг фронта
- [#1015](https://github.com/Insomnia-IT/feed/pull/1015) — Табы для групповых операций
- [#1035](https://github.com/Insomnia-IT/feed/pull/1035) — Более быстрый список волонтеров на мобилке
- [#1040](https://github.com/Insomnia-IT/feed/pull/1040) — Удалил leasot и явно указал все используемые пакеты
- [#1043](https://github.com/Insomnia-IT/feed/pull/1043) — Убран overrides для vite-plugin-pwa
- [#1044](https://github.com/Insomnia-IT/feed/pull/1044) — fix: в фильтрах волонтеров все службы
- [#1045](https://github.com/Insomnia-IT/feed/pull/1045) — feat: добавлена кухня в групповые бейджи
- [#1046](https://github.com/Insomnia-IT/feed/pull/1046) — fix: Руководитель локации не может менять количество порций на сегодняшний день
- [#1062](https://github.com/Insomnia-IT/feed/pull/1062) — fix: правка по времени питания при выгрузке в excel
- [#1063](https://github.com/Insomnia-IT/feed/pull/1063) — Обновлены зависимости
- [#1065](https://github.com/Insomnia-IT/feed/pull/1065) — Удалены неиспользуемые стили
- [#1075](https://github.com/Insomnia-IT/feed/pull/1075) — СКЛАДЫ: 3 Добавил поиск по позициям склада через search параметр (фро…
- [#1090](https://github.com/Insomnia-IT/feed/pull/1090) — feat: Таб инвентаря волонтера
- [#1091](https://github.com/Insomnia-IT/feed/pull/1091) — feat: Добавил фильтрацию волонтеров по предметам в инвентаре
- [#1097](https://github.com/Insomnia-IT/feed/pull/1097) — Правка в конфигах (в надежде выиграть в производительности)
- [#1105](https://github.com/Insomnia-IT/feed/pull/1105) — Delete unused
- [#1106](https://github.com/Insomnia-IT/feed/pull/1106) — feat: Кто выполнил действие по складам
- [#1118](https://github.com/Insomnia-IT/feed/pull/1118) — Правки по кэшу админки
- [#1127](https://github.com/Insomnia-IT/feed/pull/1127) — feat: Проверка кухни группового бейджа в кормителе
- [#1146](https://github.com/Insomnia-IT/feed/pull/1146) — Добавил тултипы в чекбоксы при создании предметов
- [#1147](https://github.com/Insomnia-IT/feed/pull/1147) — В поле выбора бригадира / ответственного не работал поиск по «Надписи на бейдже»
- [#1148](https://github.com/Insomnia-IT/feed/pull/1148) — fix: показывать полный состав группового бейджа
- [#1151](https://github.com/Insomnia-IT/feed/pull/1151) — Правки скролла
- [#1153](https://github.com/Insomnia-IT/feed/pull/1153) — Тултипы для инвентаря
- [#1154](https://github.com/Insomnia-IT/feed/pull/1154) — Правка заблокированного экрана и спрятал разделитель на мобилке
- [#1159](https://github.com/Insomnia-IT/feed/pull/1159) — Правки логики бригадира
- [#1176](https://github.com/Insomnia-IT/feed/pull/1176) — Правки групповых бейджей
- [#1183](https://github.com/Insomnia-IT/feed/pull/1183) — СКЛАДЫ: расширить "историю" в карточке волонтера
- [#1184](https://github.com/Insomnia-IT/feed/pull/1184) — Add healthchecks
