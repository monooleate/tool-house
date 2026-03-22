<!-- src/components/ui/EmailCaptureBar.svelte -->
<!--
  Email feliratkozó sáv – Brevo API integráció.
  ENV guard: ha PUBLIC_BREVO_API_KEY nincs beállítva → semmi nem renderelődik.
  Ha a user már feliratkozott (localStorage) → szintén rejtett.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ui } from '../../lib/ui-labels.ts';

  // BUILD-TIME env guard
  const BREVO_KEY = import.meta.env.PUBLIC_BREVO_API_KEY ?? '';
  const isConfigured = BREVO_KEY.length > 0;

  let email = '';
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let alreadySubscribed = false;

  onMount(() => {
    alreadySubscribed = localStorage.getItem('ku_email_subscribed') === 'true';
  });

  async function subscribe() {
    if (!email || status === 'loading') return;
    status = 'loading';
    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [import.meta.env.PUBLIC_SITE_LANG === 'hu' ? 1 : 2],
          updateEnabled: true,
          attributes: {
            SOURCE: 'konvertalo_tool_result',
            LANG: import.meta.env.PUBLIC_SITE_LANG ?? 'hu',
          },
        }),
      });
      if (res.ok || res.status === 204 || res.status === 201) {
        status = 'success';
        localStorage.setItem('ku_email_subscribed', 'true');
      } else {
        status = 'error';
      }
    } catch {
      status = 'error';
    }
  }
</script>

{#if isConfigured && !alreadySubscribed}
  <div class="email-bar">
    {#if status === 'success'}
      <p class="email-bar__success">{ui.emailBar.success}</p>
    {:else}
      <p class="email-bar__title">{ui.emailBar.title}</p>
      <div class="email-bar__form">
        <input
          type="email"
          bind:value={email}
          placeholder={ui.emailBar.placeholder}
          disabled={status === 'loading'}
          aria-label={ui.emailBar.placeholder}
        />
        <button
          on:click={subscribe}
          disabled={status === 'loading' || !email}
        >
          {status === 'loading' ? '...' : ui.emailBar.btn}
        </button>
      </div>
      {#if status === 'error'}
        <p class="email-bar__error">{ui.emailBar.error}</p>
      {/if}
      <p class="email-bar__disclaimer">{ui.emailBar.disclaimer}</p>
    {/if}
  </div>
{/if}

<style>
.email-bar {
  margin-top: var(--sp-5);
  padding: var(--sp-4) var(--sp-5);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  text-align: center;
}

.email-bar__title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: var(--sp-3);
  color: var(--text);
}

.email-bar__form {
  display: flex;
  gap: var(--sp-2);
  max-width: 420px;
  margin: 0 auto var(--sp-2);
}

.email-bar__form input {
  flex: 1;
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
  font-family: var(--font-mono);
}

.email-bar__form input:focus {
  outline: 2px solid var(--accent);
  outline-offset: -1px;
}

.email-bar__form button {
  padding: var(--sp-2) var(--sp-4);
  background: var(--accent-bright);
  color: #000;
  border: none;
  border-radius: var(--r-sm);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--t-fast);
}

.email-bar__form button:hover:not(:disabled) {
  background: var(--accent-hover, #00a87e);
}

.email-bar__form button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.email-bar__disclaimer {
  font-size: 0.7rem;
  color: var(--text-subtle);
  margin-top: var(--sp-1);
}

.email-bar__success {
  font-weight: 600;
  color: var(--accent);
  padding: var(--sp-2) 0;
}

.email-bar__error {
  font-size: 0.8rem;
  color: var(--error, #ef4444);
  margin-top: var(--sp-1);
}
</style>
