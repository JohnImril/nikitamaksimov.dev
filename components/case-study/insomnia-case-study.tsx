import Link from "next/link";
import { insomnia, insomniaReferences } from "@/content/insomnia";
import { ExternalLink } from "@/components/shared/external-link";
import { FeederHero, ProductShot } from "./insomnia-images";

const metrics = [
  {
    label: "JSON response",
    standard: "63,489 B",
    mobile: "17,220 B",
    ratio: 17220 / 63489,
    difference: "72.9% smaller",
  },
  {
    label: "Gzip level 9",
    standard: "2,362 B",
    mobile: "1,292 B",
    ratio: 1292 / 2362,
    difference: "45.3% smaller",
  },
  {
    label: "Fields per record",
    standard: "42",
    mobile: "8",
    ratio: 8 / 42,
    difference: "A narrower data contract",
  },
  {
    label: "SQL queries",
    standard: "264",
    mobile: "65",
    ratio: 65 / 264,
    difference: "75.4% fewer",
  },
  {
    label: "Median request + JSON render",
    standard: "45.52 ms",
    mobile: "12.46 ms",
    ratio: 12.4636 / 45.5239,
    difference: "≈72.6% lower locally",
  },
];

export function InsomniaCaseStudy() {
  return (
    <main id="main-content" className="case-study feeder-study" tabIndex={-1}>
      <header className="case-hero">
        <Link className="back-link" href="/#work">
          ← Selected work
        </Link>
        <p className="eyebrow">Collaborative engineering / Volunteer project</p>
        <h1>{insomnia.title}</h1>
        <p className="case-intro">{insomnia.summary}</p>
        <dl className="case-summary">
          <dt>My role</dt>
          <dd>{insomnia.role}</dd>
          <dt>Period</dt>
          <dd>{insomnia.period}</dd>
          <dt>Stack</dt>
          <dd>React / TypeScript / Django / Vite</dd>
        </dl>
      </header>
      <a
        className="feeder-hero-link"
        href="/projects/insomnia-feeder/hero-composition.webp"
        target="_blank"
        rel="noreferrer"
        aria-label="Open full-size product composition (new tab)"
      >
        <FeederHero priority />
        <span className="feeder-open">View full size ↗</span>
      </a>
      <p className="feeder-capture-note">
        Real application interfaces with deterministic synthetic records.
        English labels are a capture-only presentation layer.
      </p>
      <nav className="feeder-contents" aria-label="In this case study">
        <a href="#product">01 Product</a>
        <a href="#mobile">02 Mobile + API</a>
        <a href="#inventory">03 Inventory</a>
        <a href="#scanner">04 Scanner</a>
        <a href="#modernization">05 Platform</a>
        <a href="#collaboration">06 Ownership</a>
      </nav>

      <section
        className="case-section"
        id="product"
        aria-labelledby="product-title"
      >
        <p className="eyebrow">01 / The product</p>
        <h2 id="product-title">
          Software for the people running the festival.
        </h2>
        <p>
          An existing open-source platform developed with the Insomnia-IT team.
          Feeder connects volunteer administration and arrival coordination with
          equipment custody, group badges, and meal management. A separate field
          scanner / PWA supports kitchen operations.
        </p>
        <ProductShot
          name="volunteer-admin"
          width={1600}
          height={1000}
          alt="Volunteer administration table with arrival statuses, filters, kitchen assignments and equipment"
          caption="The coordinator’s workspace: people, arrivals, kitchens, and equipment in one operational view. All 72 volunteers shown in the demo are synthetic."
        />
      </section>

      <section
        className="case-section"
        id="mobile"
        aria-labelledby="mobile-title"
      >
        <p className="eyebrow">02 / Mobile performance and API design</p>
        <h2 id="mobile-title">
          A smaller screen needs a smaller data contract.
        </h2>
        <div className="feeder-mobile-story">
          <div>
            <p>
              The compact volunteer list was paying for the desktop
              representation. I worked on both sides of that boundary: what
              React initializes and what Django returns.
            </p>
            <h3>React: load the working view</h3>
            <p>
              The mobile list uses infinite loading in batches of 50. Desktop
              content is lazy-loaded; custom fields stay on desktop, and filter
              lookups run when visible or active. Memoized cards reduce repeated
              rendering work.
            </p>
            <h3>Django: shape the response for the task</h3>
            <p>
              A dedicated serializer is selected for <code>mobile=1</code> list
              requests. Selected model fields and prefetched arrivals narrow the
              work while preserving the existing detail endpoint.
            </p>
            <p className="feeder-takeaway">
              The dedicated mobile endpoint returns a significantly smaller data
              representation under a controlled synthetic workload.
            </p>
          </div>
          <ProductShot
            name="mobile-volunteers"
            width={390}
            height={844}
            phone
            alt="Mobile volunteer cards with arrival status, coordinator notes and inventory summaries"
            caption="The actual mobile list: arrival actions and equipment summaries without the desktop table."
          />
        </div>
        <div
          className="feeder-benchmark"
          aria-label="Standard and mobile API comparison"
        >
          <div className="feeder-benchmark-heading">
            <h3>Standard vs Mobile API — Controlled Local Benchmark</h3>
            <p>
              Same 50 synthetic records · Django REST Framework · In-memory
              SQLite · Five measured runs after warm-up.
            </p>
            <p>
              Two current API representations, measured locally. Not production
              latency or a historical before/after comparison.
            </p>
          </div>
          <div className="feeder-metrics">
            {metrics.map((metric) => (
              <div className="feeder-metric" key={metric.label}>
                <div className="feeder-metric-title">
                  <h4>{metric.label}</h4>
                  <span>{metric.difference}</span>
                </div>
                <div className="feeder-bar-row">
                  <span>Standard API</span>
                  <strong>{metric.standard}</strong>
                  <i aria-hidden="true" className="feeder-bar standard" />
                </div>
                <div className="feeder-bar-row">
                  <span>Mobile API</span>
                  <strong>{metric.mobile}</strong>
                  <i
                    aria-hidden="true"
                    className="feeder-bar mobile"
                    style={{ width: `${metric.ratio * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="feeder-benchmark-limit">
            Request + JSON render includes SQL, serialization and JSON
            rendering; it excludes network latency. Inventory lookups still
            produce N+1 queries. This compares current endpoints, not production
            performance before and after a PR.
          </p>
          <details>
            <summary>Measurement method and remaining boundaries</summary>
            <p>
              Reported timings use the preserved baseline in metrics.json → api:
              medians of five alternating-order runs after one discarded warm-up
              per variant. Both responses contain the same ordered IDs and
              matching shared fields. SQL counts include pagination; gzip uses
              level 9 and fixed mtime. Setup and authentication are outside the
              timer.
            </p>
            <p>
              The latest rerun recorded 45.58 / 12.66 ms with identical payload,
              field and query counts. Timing variance is expected. The mobile
              React hook still uses the broader VolEntity type; the compact
              response is not yet enforced by a separate TypeScript interface.
            </p>
          </details>
        </div>
      </section>

      <section
        className="case-section"
        id="inventory"
        aria-labelledby="inventory-title"
      >
        <p className="eyebrow">03 / Inventory workflows across the stack</p>
        <h2 id="inventory-title">Follow equipment from custody to history.</h2>
        <p>
          I connected existing stock APIs to volunteer profiles, built the
          transfer flow, and extended Django serializers and TypeScript types so
          equipment movements could be understood in context.
        </p>
        <div className="feeder-workflow-step">
          <h3>01 — See what a volunteer holds</h3>
          <p>
            API integration joins inventory with item details. Dedicated hooks
            expose loading, empty-stock and error states alongside quantities,
            stores and bins.
          </p>
          <ProductShot
            name="volunteer-inventory"
            width={1440}
            height={620}
            alt="Alex Reed’s inventory showing radios, headsets, battery, vest and flashlight with quantities and storage locations"
            caption="Equipment custody belongs in the volunteer’s profile, close to the coordinator’s next action."
          />
        </div>
        <div className="feeder-workflow-step">
          <h3>02 — Transfer with dependent form state</h3>
          <p>
            Changing the source clears the item and quantity; changing the item
            resets the quantity. Validation rejects self-transfers and amounts
            beyond the holder’s balance. A successful mutation refreshes both
            inventories; a failed request surfaces an error.
          </p>
          <ProductShot
            name="inventory-transfer"
            width={1440}
            height={760}
            alt="Filled inventory transfer form moving one radio from Falcon to Maple"
            caption="The real transfer form before submission. A separate synthetic scenario verifies the submitted request and updated balances."
          />
        </div>
        <div className="feeder-workflow-step">
          <h3>03 — Reconcile the operational history</h3>
          <p>
            Issues, returns and transfers become one chronological view.
            Matching API fields and typed event variants preserve each
            operation’s meaning; transfer IDs are deduplicated and prefixed row
            keys avoid collisions.
          </p>
          <ProductShot
            name="inventory-history"
            width={1600}
            height={720}
            alt="Unified inventory history with seven issues, returns and transfers, including actors and locations"
            caption="Seven synthetic events reconcile with current custody, with people and warehouse context attached."
          />
        </div>
        <details>
          <summary>Integration trade-offs</summary>
          <p>
            History combines four existing queries and sorts on the client
            without server pagination. Inventory detail loading also makes
            requests per position. These changes make the workflow coherent;
            they do not introduce a bulk inventory API or an unlimited-scale
            audit log.
          </p>
        </details>
      </section>

      <section
        className="case-section"
        id="scanner"
        aria-labelledby="scanner-title"
      >
        <p className="eyebrow">04 / Field scanner and business rules</p>
        <h2 id="scanner-title">
          Make operational rules visible at the point of use.
        </h2>
        <p>
          I carried group-badge kitchen assignment into the scanner,
          distinguishing an unassigned kitchen from a mismatched one before the
          existing feeding validation flow. Eligible members and blocked states
          remain visible to the operator.
        </p>
        <div className="feeder-scanner-pair">
          <ProductShot
            name="field-scanner"
            width={390}
            height={844}
            phone
            alt="Group badge scanner with five eligible members, two vegan meals, three standard meals and one ineligible member"
            caption="Group badge resolved: five eligible members, one flagged member, and the existing meal confirmation flow."
          />
          <ProductShot
            name="field-scanner-validation"
            width={390}
            height={844}
            phone
            alt="Scanner rejecting a group badge assigned to kitchen one when scanned at kitchen two"
            caption="Wrong kitchen: a distinct rejection state prevents continuing through the normal feeding UI."
          />
        </div>
        <p className="feeder-capture-note">
          The existing scanner stores volunteers, badges and transactions
          locally in Dexie / IndexedDB. These captures inject a synthetic
          hardware-scan event into that workflow; they demonstrate post-scan
          behavior, not optical QR recognition or a tested offline reliability
          guarantee.
        </p>
      </section>

      <section
        className="case-section"
        id="modernization"
        aria-labelledby="modernization-title"
      >
        <p className="eyebrow">05 / Platform modernization</p>
        <h2 id="modernization-title">Make the build path explicit.</h2>
        <p>
          I migrated the scanner from CRA / CRACO to Vite, modernized the
          admin’s existing Vite setup, and updated shared developer tooling.
          Then I replaced Lerna / Nx orchestration with direct npm workspace
          commands.
        </p>
        <div className="feeder-tooling">
          <div>
            <span className="eyebrow">Previously</span>
            <h3>
              Separate app toolchains
              <br />
              Lerna / Nx task orchestration
            </h3>
          </div>
          <span aria-hidden="true">→</span>
          <div>
            <span className="eyebrow">Now</span>
            <h3>
              Vite for admin + scanner
              <br />
              npm workspaces · explicit build sequence
            </h3>
          </div>
        </div>
        <div className="case-columns">
          <div>
            <h3>Preserve the delivery contract</h3>
            <p>
              The scanner’s base path, PWA manifest and API configuration still
              had to work with container delivery. Shared linting, staged-file
              checks and TypeScript references support development across both
              apps.
            </p>
          </div>
          <div>
            <h3>Choose the trade-off deliberately</h3>
            <p>
              Direct scripts are easier to trace, but removing Nx also removes
              its configured build cache and affected-build commands. No
              verified historical build-speed percentage is claimed.
            </p>
          </div>
        </div>
      </section>

      <section
        className="case-section"
        id="collaboration"
        aria-labelledby="collaboration-title"
      >
        <p className="eyebrow">06 / Engineering ownership and collaboration</p>
        <h2 id="collaboration-title">
          Frontend ownership across system boundaries.
        </h2>
        <p>
          My work connected React interactions to data contracts, targeted
          Django validation, and application delivery. As JohnImril, I
          contributed through the team’s pull requests and review process,
          working within existing coordinator roles, stock endpoints and scanner
          state.
        </p>
        <p>
          In the mobile-loading PR, review exposed a deployment risk: long-lived
          caching could leave users on outdated resources after an update. I
          revised the cache policy: built assets retain long-lived caching,
          while HTML, service-worker registration and Workbox scripts require
          revalidation. This keeps the delivery optimization without applying
          the same cache lifetime to update-sensitive entry points.
        </p>
        <ExternalLink
          className="text-link"
          href="https://github.com/Insomnia-IT/feed/pull/1035#discussion_r3254882171"
        >
          Read the cache-policy review
        </ExternalLink>
        <div className="feeder-evidence">
          <ExternalLink className="text-link" href={insomnia.repository}>
            Explore Feeder on GitHub
          </ExternalLink>
          <details>
            <summary>Selected implementation evidence</summary>
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
          </details>
        </div>
      </section>
      <nav className="case-navigation" aria-label="Continue exploring">
        <Link href="/#work">← All selected work</Link>
        <Link href="/work/diablo-web">Next: Diablo Web →</Link>
      </nav>
    </main>
  );
}
