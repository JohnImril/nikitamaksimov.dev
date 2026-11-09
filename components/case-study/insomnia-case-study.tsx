import Link from "next/link";
import {
  insomnia,
  insomniaReferences,
  insomniaThemes,
} from "@/content/insomnia";
import { ExternalLink } from "@/components/shared/external-link";
import {
  InsomniaProductMap,
  InventoryFlow,
  MobileDelivery,
  KitchenFlow,
} from "./insomnia-visuals";

export function InsomniaCaseStudy() {
  return (
    <main id="main-content" className="case-study feeder-study" tabIndex={-1}>
      <header className="case-hero">
        <Link className="back-link" href="/#work">
          ← Selected work
        </Link>
        <p className="eyebrow">Collaborative engineering / Feeder</p>
        <h1>{insomnia.title}</h1>
        <p className="case-intro">{insomnia.summary}</p>
        <dl className="case-summary">
          <dt>My role</dt>
          <dd>{insomnia.role}</dd>
          <dt>Contribution period</dt>
          <dd>{insomnia.period}</dd>
          <dt>Core stack</dt>
          <dd>React · TypeScript · Django REST Framework · Vite</dd>
        </dl>
        <p className="case-scope">
          An existing open-source platform developed with the Insomnia-IT team.
          My work extends the application and its tooling; the product, design,
          and original architecture are shared team work.
        </p>
      </header>
      <InsomniaProductMap />
      <nav className="feeder-contents" aria-label="In this case study">
        <a href="#context">01 Context</a>
        <a href="#contribution">02 Contribution</a>
        <a href="#decisions">03 Decisions</a>
        <a href="#showcase">04 Workflows</a>
        <a href="#results">05 Impact</a>
        <a href="#collaboration">06 Collaboration</a>
      </nav>

      <section
        className="case-section case-context"
        id="context"
        aria-labelledby="context-title"
      >
        <div>
          <p className="eyebrow">01 / Product context</p>
          <h2 id="context-title">
            Software for the people running the festival.
          </h2>
          <p>
            Feeder supports Insomnia Festival’s volunteer operations: who is
            arriving, which service they belong to, where they eat, and what
            equipment they hold. Coordinators manage individual volunteers and
            group badges; kitchen operators use a field scanner to check badges
            and record meals.
          </p>
          <p>
            This work happened inside a running, collaborative codebase. Changes
            had to fit existing records, coordinator roles, and deployment
            workflows while the admin and scanner continued to serve different
            operating needs.
          </p>
        </div>
        <aside className="case-note">
          <h3>Two clients, shared operational data</h3>
          <p>
            <strong>Administrative application.</strong> React, Refine, and Ant
            Design for volunteer coordination, meals, groups, and inventory.
          </p>
          <p>
            <strong>Field scanner / PWA.</strong> React with Dexie-backed local
            data for badge-based meal operations.
          </p>
          <p>
            <strong>Django backend.</strong> REST endpoints, serializers,
            business rules, and shared volunteer, meal, and stock records.
          </p>
        </aside>
      </section>

      <section
        className="case-section"
        id="contribution"
        aria-labelledby="contribution-title"
      >
        <p className="eyebrow">02 / My engineering contribution</p>
        <h2 id="contribution-title">Four connected areas of responsibility.</h2>
        <div className="feeder-initiatives">
          {insomniaThemes.map((theme, index) => (
            <article key={theme.id} id={theme.id} className="feeder-initiative">
              <div>
                <p className="eyebrow">
                  0{index + 1} / {theme.label}
                </p>
                <h3>{theme.title}</h3>
              </div>
              <div>
                <p>{theme.problem}</p>
                <p>{theme.contribution}</p>
                <p>{theme.decision}</p>
                <p className="feeder-outcome">
                  <strong>Practical result.</strong> {theme.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="case-section"
        id="decisions"
        aria-labelledby="decisions-title"
      >
        <p className="eyebrow">03 / Engineering decisions</p>
        <h2 id="decisions-title">
          Choose boundaries that remove unnecessary work.
        </h2>
        <article className="feeder-decision">
          <div>
            <h3>Separate data requirements, not just layouts.</h3>
            <p>
              Hiding desktop columns would still deliver the general response. I
              selected the smaller serializer only for list requests with{" "}
              <code>mobile=1</code>, paired it with field selection and an
              arrival prefetch, and kept the existing detail path.
            </p>
            <p>
              <strong>Trade-off:</strong> two list representations must stay
              aligned with their consumers. The frontend still uses the broader{" "}
              <code>VolEntity</code> type in this change, so the mobile
              serializer is not a separately enforced TypeScript contract.
            </p>
          </div>
          <div className="feeder-code">
            <span>Django · excerpt from the mobile list change</span>
            <pre>
              <code>{`def is_mobile_list_request(self):
    return self.action == 'list' and \\
        self.request.query_params.get('mobile') == '1'

def get_serializer_class(self):
    if self.is_mobile_list_request():
        return serializers.VolunteerMobileListSerializer
    return super().get_serializer_class()`}</code>
            </pre>
            <a className="text-link" href="#evidence-1035">
              Inspect the mobile implementation ↓
            </a>
          </div>
        </article>
        <article className="feeder-decision">
          <div>
            <h3>Make the build sequence explicit.</h3>
            <p>
              After updating the shared toolchain and moving the scanner to
              Vite, I replaced Lerna build orchestration with direct workspace
              commands. App-specific dev and preview commands stayed available;
              TypeScript project references continued to cover both
              applications.
            </p>
            <p>
              <strong>Trade-off:</strong> removing Nx also removes its
              configured build cache and affected-build command. The new
              sequence is easier to inspect, but I do not present that
              simplification as a measured build-speed win.
            </p>
          </div>
          <div className="feeder-code">
            <span>Root scripts · excerpt from the orchestration change</span>
            <pre>
              <code>{`"build": "npm-run-all -s build:admin build:scanner",
"build:admin": "npm --workspace @feed/admin run build",
"build:scanner": "npm --workspace @feed/scanner run build"`}</code>
            </pre>
            <a className="text-link" href="#evidence-995">
              Inspect the build change ↓
            </a>
          </div>
        </article>
        <article className="feeder-decision">
          <div>
            <h3>Unify the history without conflating its events.</h3>
            <p>
              I extended Django serializers with warehouse names and matched
              those fields in frontend interfaces. A discriminated union
              preserves whether each row is an issue, return, or transfer.
              Transfers are deduplicated by ID; prefixed row keys prevent
              collisions between different event types.
            </p>
            <p>
              <strong>Trade-off:</strong> composition stays in React and reuses
              existing endpoints, at the cost of four queries and client-side
              sorting. This change loads the histories without server
              pagination; it is not an unlimited-scale audit architecture.
            </p>
          </div>
          <div className="feeder-code">
            <span>React / TypeScript · excerpt from history normalization</span>
            <pre>
              <code>{`items.map((item) => ({
    ...item,
    historyType,
    rowKey: \`\${historyType}-\${item.id}\`
}))`}</code>
            </pre>
            <a className="text-link" href="#evidence-1183">
              Inspect the history implementation ↓
            </a>
          </div>
        </article>
      </section>

      <section
        className="case-section"
        id="showcase"
        aria-labelledby="showcase-title"
      >
        <p className="eyebrow">04 / Product workflows</p>
        <h2 id="showcase-title">
          Follow the operator’s task through the system.
        </h2>
        <p>
          These simplified diagrams explain the implemented workflows. They are
          not production screenshots and contain no volunteer records.
        </p>
        <div className="feeder-showcase-item">
          <h3>Inventory: from a profile to a recorded movement</h3>
          <InventoryFlow />
        </div>
        <div className="feeder-showcase-item">
          <h3>Volunteer management: different needs on desktop and mobile</h3>
          <MobileDelivery />
        </div>
        <div className="feeder-showcase-item">
          <h3>Group badges: carry kitchen assignment into field scanning</h3>
          <KitchenFlow />
        </div>
      </section>

      <section
        className="case-section"
        id="results"
        aria-labelledby="results-title"
      >
        <p className="eyebrow">05 / Results and engineering impact</p>
        <h2 id="results-title">Concrete changes to how the platform works.</h2>
        <dl className="feeder-results">
          <dt>A shared frontend build path</dt>
          <dd>
            Admin and scanner use Vite, with npm workspaces and direct build
            commands instead of Lerna/Nx orchestration.
          </dd>
          <dt>More targeted mobile delivery</dt>
          <dd>
            A dedicated list serializer, selected model fields, prefetched
            arrivals, deferred desktop UI, and conditional lookup requests
            reduce unnecessary work.
          </dd>
          <dt>A connected equipment workflow</dt>
          <dd>
            Volunteer profiles expose stock and transfers; history includes
            warehouse issues, returns, and person-to-person movements with actor
            information.
          </dd>
          <dt>Rules represented across the stack</dt>
          <dd>
            Supervisor candidate filtering and write validation accompany the
            frontend controls; group-badge kitchen assignment reaches the
            scanner’s result states.
          </dd>
        </dl>
        <p>
          No controlled production before/after benchmark is presented here. The
          outcomes describe merged code and supported workflows, without
          attributing adoption, uptime, or festival-wide results to these
          changes.
        </p>
      </section>

      <section
        className="case-section"
        id="collaboration"
        aria-labelledby="collaboration-title"
      >
        <p className="eyebrow">06 / Technology and collaboration</p>
        <h2 id="collaboration-title">Frontend depth inside a shared system.</h2>
        <div className="case-columns">
          <div>
            <p>
              React and TypeScript express the admin workflows, with Refine and
              TanStack Query handling API integration. Django REST Framework
              supplies data representations and server-side validation. The
              scanner combines React, PWA tooling, and Dexie local storage; Vite
              builds both clients.
            </p>
            <p>
              My primary role was frontend engineering, with targeted Django
              changes where the workflow required a different API contract or
              business rule. I contributed as JohnImril, working through the
              team’s pull requests and review process.
            </p>
          </div>
          <aside className="case-note">
            <h3>Modernization through collaboration</h3>
            <p>
              Tooling review included discussion of Husky hooks, workspace
              dependencies, and the scanner’s version file. The team confirmed
              version generation already belonged to the Docker build, allowing
              the obsolete commit-hook behavior to be removed. I kept broader
              style-rule changes out of that migration and recorded follow-up
              work.
            </p>
            <p>
              I did not create the platform alone, own the complete backend, or
              design all the interfaces shown by other contributors.
            </p>
          </aside>
        </div>
        <div className="feeder-evidence">
          <h3>Optional implementation evidence</h3>
          <ExternalLink className="text-link" href={insomnia.repository}>
            Explore the shared source repository ↗
          </ExternalLink>
          <ul>
            {insomniaReferences.map((reference) => (
              <li key={reference.number} id={`evidence-${reference.number}`}>
                <ExternalLink
                  className="text-link"
                  href={`${insomnia.repository}/pull/${reference.number}`}
                >
                  {reference.title}{" "}
                  <span className="feeder-reference-number">
                    #{reference.number}
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <nav className="case-navigation" aria-label="Continue exploring">
        <Link href="/#work">← All selected work</Link>
        <Link href="/work/diablo-web">Next: Diablo Web →</Link>
      </nav>
    </main>
  );
}
