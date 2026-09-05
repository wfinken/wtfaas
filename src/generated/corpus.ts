// AUTO-GENERATED. DO NOT EDIT.
// Run `npm run corpus`.
export const corpus = {
  "ack": {
    "received": [
      "Received. It has entered the machinery.",
      "Received. The gears are now aware."
    ],
    "understood": [
      "Understood. Adjusting the plan accordingly.",
      "Understood. The important part has been noted."
    ],
    "will-do": [
      "Will do. It is on the list.",
      "Consider it queued."
    ],
    "done": [
      "Done. Nothing exploded visibly.",
      "Done. The checkbox has been checked."
    ],
    "thanks": [
      "Thanks. This is genuinely useful.",
      "Much appreciated."
    ],
    "noted": [
      "Noted. Future me has been warned."
    ],
    "approved": [
      "Approved. Please proceed with appropriate caution."
    ],
    "rejected": [
      "Rejected. The risk-to-regret ratio was unfavorable."
    ],
    "seen": [
      "Seen. Processing has commenced."
    ],
    "begrudging": [
      "Acknowledged, with administrative enthusiasm."
    ]
  },
  "status": {
    "working": [
      "Working on it. The computer has been informed.",
      "In progress. Momentum is plausible."
    ],
    "deploying": [
      "Deploying. Please avoid startling production.",
      "Deployment in progress. The buttons are being pressed carefully."
    ],
    "degraded": [
      "Degraded service. Some parts are taking the scenic route."
    ],
    "broken": [
      "Broken, but now with a ticket and a theory."
    ],
    "investigating": [
      "Investigating. We have several theories and one suspicious log line."
    ],
    "waiting": [
      "Waiting on a dependency with its own feelings."
    ],
    "blocked": [
      "Blocked pending an answer, access, or a small miracle."
    ],
    "done": [
      "Complete. The thing now does the thing."
    ],
    "offline": [
      "Offline for maintenance. We will return with fewer mysteries."
    ],
    "maintenance": [
      "Maintenance in progress. Expected disruption is intentional."
    ],
    "friday": [
      "Friday mode: changes are being evaluated with unusual skepticism."
    ]
  },
  "reason": {
    "cancel": [
      "We need to cancel because the necessary conditions are not in place."
    ],
    "decline": [
      "We cannot take this on without compromising current commitments."
    ],
    "delay": [
      "Additional validation is needed before we can proceed safely."
    ],
    "reschedule": [
      "The required participants are not available at the planned time."
    ],
    "leave-early": [
      "I need to leave early to handle a prior commitment."
    ],
    "skip-meeting": [
      "An asynchronous update will be more useful than another meeting."
    ],
    "reject": [
      "The proposal does not meet the current requirements."
    ],
    "pause": [
      "We are pausing to resolve the open risks first."
    ],
    "rollback": [
      "We are rolling back to restore a known-good state."
    ],
    "maintenance": [
      "Scheduled maintenance is required to keep the service reliable."
    ],
    "rate-limit": [
      "Requests are being limited to keep the service available for everyone."
    ]
  },
  "excuse": {
    "late": [
      "I underestimated the travel time and should have communicated sooner."
    ],
    "meeting": [
      "I am tied up in a meeting that has exceeded its original estimate."
    ],
    "deadline": [
      "The remaining work needs more validation than planned."
    ],
    "deploy": [
      "The deployment exposed an environment-specific issue that did not reproduce locally.",
      "A configuration difference appeared after release."
    ],
    "outage": [
      "An upstream dependency is not responding consistently."
    ],
    "email": [
      "Your message was routed into an unusually busy part of my inbox."
    ],
    "reply": [
      "I needed time to verify the details before replying."
    ],
    "work": [
      "A higher-priority incident required immediate attention."
    ],
    "school": [
      "I misjudged the time required for the assignment."
    ],
    "cancel": [
      "A scheduling conflict makes it impractical to attend."
    ],
    "leave-early": [
      "I have a prior commitment that needs my attention."
    ],
    "camera-off": [
      "My connection is unstable, so I am preserving audio quality."
    ],
    "missed-call": [
      "I was away from my phone and missed the call."
    ],
    "code-review": [
      "I am validating the change against the surrounding system before approving it."
    ]
  },
  "blame": {
    "deploy": [
      {
        "culprit": "configuration drift",
        "message": "Production and local appear to have been living separate lives.",
        "check": "Compare runtime environment variables and deployed configuration."
      }
    ],
    "outage": [
      {
        "culprit": "DNS",
        "message": "DNS remains a person of interest.",
        "check": "Verify resolution from multiple networks and inspect recent DNS changes."
      }
    ],
    "network": [
      {
        "culprit": "the network",
        "message": "Packets are taking a path with character development.",
        "check": "Check latency, packet loss, and recent routing changes."
      }
    ],
    "frontend": [
      {
        "culprit": "cache",
        "message": "There is an excellent chance somebody cached yesterday.",
        "check": "Verify asset versions and clear affected caches."
      }
    ],
    "backend": [
      {
        "culprit": "an upstream dependency",
        "message": "The dependency graph has developed opinions.",
        "check": "Inspect dependency health and timeout rates."
      }
    ],
    "database": [
      {
        "culprit": "the database",
        "message": "The database would like a word about that query.",
        "check": "Inspect slow queries, locks, and connection saturation."
      }
    ],
    "ci": [
      {
        "culprit": "stale credentials",
        "message": "The credentials have quietly expired again.",
        "check": "Rotate and validate the CI credential."
      }
    ],
    "performance": [
      {
        "culprit": "a race condition",
        "message": "Timing has become a feature requirement.",
        "check": "Trace concurrent requests and shared state."
      }
    ],
    "meeting": [
      {
        "culprit": "time zones",
        "message": "The calendar has interpreted time creatively.",
        "check": "Confirm attendee zones and calendar settings."
      }
    ],
    "deadline": [
      {
        "culprit": "scope",
        "message": "The work became more specific while nobody was looking.",
        "check": "Reconfirm requirements and remove nonessential work."
      }
    ],
    "general": [
      {
        "culprit": "a missing environment variable",
        "message": "One small value is absent, and it has consequences.",
        "check": "Compare required configuration with the running environment."
      }
    ]
  }
} as const;
