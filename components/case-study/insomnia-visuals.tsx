/** Explanatory diagrams, deliberately not replicas of the production interface. */
export function InsomniaProductMap() {
  return (
    <figure className="feeder-product-map">
      <div className="feeder-map-heading">
        <span>INSOMNIA FESTIVAL</span>
        <span>Feeder / operations</span>
      </div>
      <p className="feeder-map-title">From arrival to the field.</p>
      <div className="feeder-map-lanes">
        <div>
          <span className="feeder-map-index">01 / COORDINATE</span>
          <strong>Volunteer admin</strong>
          <p>People · arrivals · groups</p>
          <span className="feeder-map-task">
            Find a volunteer → manage their stay
          </span>
        </div>
        <div>
          <span className="feeder-map-index">02 / EQUIP</span>
          <strong>Inventory operations</strong>
          <p>Warehouse · holder · history</p>
          <span className="feeder-map-task">Issue → transfer → return</span>
        </div>
        <div>
          <span className="feeder-map-index">03 / FEED</span>
          <strong>Field scanner</strong>
          <p>QR badges · kitchens · meals</p>
          <span className="feeder-map-task">
            Scan a badge → check meal eligibility
          </span>
        </div>
      </div>
      <div className="feeder-map-api">
        <strong>Django API</strong>
        <span>Shared volunteer, meal, and inventory records</span>
      </div>
      <figcaption>
        Simplified product map · existing collaborative platform
      </figcaption>
    </figure>
  );
}

export function InventoryFlow() {
  return (
    <figure className="feeder-flow">
      <p className="eyebrow">Simplified transfer workflow</p>
      <ol className="feeder-flow-steps">
        <li>
          <strong>Choose the source</strong>
          <span>Load inventory + position details</span>
        </li>
        <li>
          <strong>Select item + quantity</strong>
          <span>Clear dependent fields when the source changes</span>
        </li>
        <li>
          <strong>Submit movement</strong>
          <span>POST position, count, from, to, actor</span>
        </li>
        <li>
          <strong>Refresh both balances</strong>
          <span>Success closes the form; failure shows an error</span>
        </li>
      </ol>
      <div className="feeder-history-flow">
        <div>
          <span>Warehouse issues</span>
          <span>Transfers from / to</span>
          <span>Warehouse returns</span>
        </div>
        <p>↓ Django serializers → TypeScript event union ↓</p>
        <strong>One chronological volunteer history</strong>
      </div>
      <figcaption>
        The profile transfer flow connects existing stock APIs to React state.
        The history combines four queries, deduplicates transfers, and labels
        the kind of movement.
      </figcaption>
    </figure>
  );
}

export function MobileDelivery() {
  return (
    <figure className="feeder-flow">
      <p className="eyebrow">Simplified data delivery</p>
      <div className="feeder-delivery">
        <div>
          <span>DESKTOP / ADMIN</span>
          <strong>Table + bulk operations</strong>
          <p>
            General volunteer list
            <br />
            Custom fields on desktop
            <br />
            Desktop module loaded on demand
          </p>
        </div>
        <div>
          <span>MOBILE / FIELD</span>
          <strong>Compact volunteer list</strong>
          <p>
            List request with mobile=1
            <br />
            Names, note, blocking, arrivals
            <br />
            Existing infinite-list pagination
          </p>
        </div>
      </div>
      <div className="feeder-map-api">
        <strong>Same volunteer API</strong>
        <span>
          Serializer selected for the list request; detail views retain their
          contract
        </span>
      </div>
      <figcaption>
        This illustrates loading boundaries, not a benchmark. Mobile filter
        lookups are enabled when visible or active rather than all being
        requested at startup.
      </figcaption>
    </figure>
  );
}

export function KitchenFlow() {
  return (
    <figure className="feeder-flow">
      <p className="eyebrow">Simplified scanner state flow</p>
      <div className="feeder-kitchen-start">
        Scan group badge → compare assigned kitchen
      </div>
      <div className="feeder-kitchen-branches">
        <div>
          <strong>Missing or different</strong>
          <span>
            Explain the kitchen assignment
            <br />
            Stop this UI feeding path
          </span>
        </div>
        <div>
          <strong>Matches</strong>
          <span>
            Continue loading and existing
            <br />
            group meal validation
          </span>
        </div>
      </div>
      <figcaption>
        The admin assigns the kitchen; the scanner consumes its nullable ID and
        shows a specific result. This diagram describes the client check added
        in the contribution.
      </figcaption>
    </figure>
  );
}
