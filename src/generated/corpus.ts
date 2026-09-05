// AUTO-GENERATED. DO NOT EDIT.
// From categories/*/*.txt. Run `npm run corpus`.
export const corpus = {
  "ack": {
    "approved": [
      "Approved. Please proceed with appropriate caution.",
      "This meets the stated criteria.",
      "Approved for the proposed scope.",
      "You have the go-ahead for this change.",
      "Accepted as proposed.",
      "The review is complete; proceed.",
      "Approved, with the documented conditions."
    ],
    "begrudging": [
      "Acknowledged, with administrative enthusiasm.",
      "Fine. I have located the required enthusiasm.",
      "Understood. My objections have been filed internally.",
      "Acknowledged through a modest sigh.",
      "Yes, including that part.",
      "Accepted with a small administrative groan.",
      "I will cooperate with the documented reality."
    ],
    "done": [
      "Done. Nothing exploded visibly.",
      "Done. The checkbox has been checked.",
      "Finished and ready for your review.",
      "Completed. The loose ends are tied.",
      "The requested work is wrapped up.",
      "That is now in the completed pile.",
      "All requested steps are accounted for.",
      "Finished. Please inspect the result."
    ],
    "noted": [
      "Noted. Future me has been warned.",
      "Added to the working notes.",
      "Recorded for the next decision.",
      "That detail is now on the record.",
      "Noted for future reference, with reasonable optimism.",
      "Logged in the relevant corner of my brain.",
      "This will inform the next pass."
    ],
    "received": [
      "Received. It has entered the machinery.",
      "Received. The gears are now aware.",
      "Receipt confirmed. The next step is processing.",
      "Got it. This is now an official thing.",
      "Your message made it through the pipes.",
      "Received and ready for review.",
      "Successfully delivered to the attention department.",
      "The request has landed safely."
    ],
    "rejected": [
      "Rejected. The risk-to-regret ratio was unfavorable.",
      "This needs revision before approval.",
      "Not approved in its current form.",
      "Please address the open concerns first.",
      "This does not meet the agreed criteria.",
      "Declined for the reasons already recorded.",
      "Return this to the drafting table."
    ],
    "seen": [
      "Seen. Processing has commenced.",
      "Read, but not yet acted on.",
      "Visible in the queue now.",
      "I have seen the update.",
      "This has my attention.",
      "Read. A considered response will follow.",
      "The message is no longer unread."
    ],
    "thanks": [
      "Thanks. This is genuinely useful.",
      "Much appreciated.",
      "Thank you for catching that.",
      "That saved a useful amount of time.",
      "Thanks for the clear explanation.",
      "Appreciated. One fewer mystery.",
      "Thank you for following through.",
      "Thanks for making the next step easier."
    ],
    "understood": [
      "Understood. Adjusting the plan accordingly.",
      "Understood. The important part has been noted.",
      "Clear. I can work with that.",
      "That makes sense. Proceeding on that basis.",
      "The requirements are clear now.",
      "Understood, including the inconvenient details.",
      "I follow the reasoning.",
      "No further decoding required."
    ],
    "will-do": [
      "Will do. It is on the list.",
      "Consider it queued.",
      "I will take care of the next step.",
      "On my list and within my remit.",
      "Queued for action, not just admiration.",
      "I will follow through on this.",
      "Taking ownership of the follow-up.",
      "I can handle that from here."
    ]
  },
  "blame": {
    "backend": [
      {
        "message": "The dependency graph has developed opinions.",
        "culprit": "an upstream dependency",
        "check": "Inspect dependency health and timeout rates."
      },
      {
        "message": "The pool is full and the requests are still arriving.",
        "culprit": "connection pool saturation",
        "check": "Inspect pool occupancy and connection wait times."
      },
      {
        "message": "The handler found an exception without a recovery plan.",
        "culprit": "an unhandled exception",
        "check": "Trace errors to the failing handler and input shape."
      },
      {
        "message": "Two requests updated the same thing with different memories.",
        "culprit": "concurrent writes",
        "check": "Check transaction boundaries and update conflicts."
      },
      {
        "message": "A synchronous task is holding the line hostage.",
        "culprit": "blocking work",
        "check": "Profile request execution and long-running synchronous operations."
      },
      {
        "message": "The schema changed before all callers got the memo.",
        "culprit": "contract drift",
        "check": "Compare request and response schemas across versions."
      },
      {
        "message": "The timeout budget was spent before the final dependency.",
        "culprit": "timeout allocation",
        "check": "Trace per-dependency latency and overall request deadlines."
      }
    ],
    "ci": [
      {
        "message": "The credentials have quietly expired again.",
        "culprit": "stale credentials",
        "check": "Rotate and validate the CI credential."
      },
      {
        "message": "The runner is still remembering the previous build.",
        "culprit": "a stale build cache",
        "check": "Retry with a clean cache and compare dependency versions."
      },
      {
        "message": "The test depends on a clock with different priorities.",
        "culprit": "time-sensitive tests",
        "check": "Check clock assumptions and timezone settings."
      },
      {
        "message": "The lockfile and installation command have parted ways.",
        "culprit": "dependency drift",
        "check": "Verify lockfile use and package manager versions."
      },
      {
        "message": "The secret is available to the branch next door.",
        "culprit": "secret scoping",
        "check": "Check secret availability for this workflow and event."
      },
      {
        "message": "The runner has less memory than the laptop.",
        "culprit": "runner resource limits",
        "check": "Inspect peak memory and runner capacity."
      },
      {
        "message": "The test order has become an undocumented dependency.",
        "culprit": "shared test state",
        "check": "Run the failing test alone and inspect cleanup."
      }
    ],
    "database": [
      {
        "message": "The database would like a word about that query.",
        "culprit": "the database",
        "check": "Inspect slow queries, locks, and connection saturation."
      },
      {
        "message": "The index does not cover the question being asked.",
        "culprit": "a missing index",
        "check": "Inspect query plans and scanned row counts."
      },
      {
        "message": "A transaction has been holding the door for a very long time.",
        "culprit": "a long transaction",
        "check": "Inspect transaction age and blocked sessions."
      },
      {
        "message": "The replica has not caught up with the conversation.",
        "culprit": "replication lag",
        "check": "Compare replication position and read routing."
      },
      {
        "message": "The query is retrieving a neighborhood to find one house.",
        "culprit": "an unbounded query",
        "check": "Check filters, pagination, and returned row counts."
      },
      {
        "message": "The disk has run out of places to put the next good idea.",
        "culprit": "storage exhaustion",
        "check": "Check available storage and growth trends."
      },
      {
        "message": "The connection limit has become a queueing policy.",
        "culprit": "too many connections",
        "check": "Inspect active sessions and pool limits."
      }
    ],
    "deadline": [
      {
        "message": "The work became more specific while nobody was looking.",
        "culprit": "scope",
        "check": "Reconfirm requirements and remove nonessential work."
      },
      {
        "message": "The estimate counted implementation but forgot the review.",
        "culprit": "incomplete planning",
        "check": "Include review and validation in the remaining estimate."
      },
      {
        "message": "The critical path includes a handoff nobody owns.",
        "culprit": "an unowned dependency",
        "check": "Identify the owner and expected delivery of each dependency."
      },
      {
        "message": "The requirements are still arriving after work has started.",
        "culprit": "requirement churn",
        "check": "Freeze the agreed scope and track new requests separately."
      },
      {
        "message": "The schedule assumes everyone is available at once.",
        "culprit": "capacity assumptions",
        "check": "Check actual availability against planned work."
      },
      {
        "message": "The work is almost done in several incompatible places.",
        "culprit": "integration delay",
        "check": "Plan time for integration and end-to-end validation."
      },
      {
        "message": "The calendar omitted the time required to fix failed tests.",
        "culprit": "missing contingency",
        "check": "Re-estimate using unresolved defects and validation work."
      }
    ],
    "deploy": [
      {
        "message": "Production and local appear to have been living separate lives.",
        "culprit": "configuration drift",
        "check": "Compare runtime environment variables and deployed configuration."
      },
      {
        "message": "A feature flag took a different position in production.",
        "culprit": "a feature flag",
        "check": "Compare flag values between environments."
      },
      {
        "message": "The container is carrying an older idea of the application.",
        "culprit": "a stale image",
        "check": "Verify the deployed image digest against the release artifact."
      },
      {
        "message": "The migration and the application arrived in the wrong order.",
        "culprit": "migration ordering",
        "check": "Check schema compatibility and migration completion."
      },
      {
        "message": "The new version has not introduced itself to the health probe.",
        "culprit": "probe configuration",
        "check": "Verify readiness paths and startup grace periods."
      },
      {
        "message": "The environment variable exists, just not in this environment.",
        "culprit": "missing configuration",
        "check": "Inspect required runtime bindings and variables."
      },
      {
        "message": "The artifact took a detour through the wrong environment.",
        "culprit": "release targeting",
        "check": "Verify the deployment target and artifact version."
      }
    ],
    "frontend": [
      {
        "message": "There is an excellent chance somebody cached yesterday.",
        "culprit": "cache",
        "check": "Verify asset versions and clear affected caches."
      },
      {
        "message": "The browser and the API disagree about introductions.",
        "culprit": "CORS configuration",
        "check": "Check preflight responses and allowed origins."
      },
      {
        "message": "An old tab is trying to load new chunks by their old names.",
        "culprit": "asset version skew",
        "check": "Inspect failed asset requests and cache headers."
      },
      {
        "message": "The interface rendered before its data finished arriving.",
        "culprit": "asynchronous state",
        "check": "Inspect loading states and request completion order."
      },
      {
        "message": "The stylesheet brought a rule with too much authority.",
        "culprit": "CSS specificity",
        "check": "Inspect computed styles and overriding selectors."
      },
      {
        "message": "The event listener has been invited more than once.",
        "culprit": "duplicate listeners",
        "check": "Check listener registration and cleanup."
      },
      {
        "message": "The client bundle packed a server-only assumption.",
        "culprit": "environment mismatch",
        "check": "Inspect browser console errors and build-time variables."
      }
    ],
    "general": [
      {
        "message": "One small value is absent, and it has consequences.",
        "culprit": "a missing environment variable",
        "check": "Compare required configuration with the running environment."
      },
      {
        "message": "Yesterday's configuration is still doing today's work.",
        "culprit": "stale configuration",
        "check": "Compare active configuration with the intended version."
      },
      {
        "message": "A default value has quietly become a design decision.",
        "culprit": "an implicit default",
        "check": "Inspect unset options and their documented defaults."
      },
      {
        "message": "The timezone was obvious until another machine got involved.",
        "culprit": "timezone assumptions",
        "check": "Compare stored timestamps and timezone conversion rules."
      },
      {
        "message": "The documentation and the running version have different birthdays.",
        "culprit": "outdated documentation",
        "check": "Check documentation against the installed version."
      },
      {
        "message": "The dependency upgraded while the assumptions stayed put.",
        "culprit": "version incompatibility",
        "check": "Compare dependency versions and compatibility requirements."
      },
      {
        "message": "The happy path had no plan for this particular detour.",
        "culprit": "an unhandled edge case",
        "check": "Reproduce the failing input and inspect boundary handling."
      }
    ],
    "meeting": [
      {
        "message": "The calendar has interpreted time creatively.",
        "culprit": "time zones",
        "check": "Confirm attendee zones and calendar settings."
      },
      {
        "message": "The agenda describes a topic rather than a decision.",
        "culprit": "an unclear agenda",
        "check": "Write the decision required before scheduling the session."
      },
      {
        "message": "The person who can decide is missing from the invitation.",
        "culprit": "missing decision authority",
        "check": "Confirm the decision owner can participate."
      },
      {
        "message": "The conversation is trying to review a document nobody received.",
        "culprit": "missing preparation",
        "check": "Share the material before the next discussion."
      },
      {
        "message": "The recurring invite has outlived its original purpose.",
        "culprit": "calendar inertia",
        "check": "Check whether the recurring meeting still has an outcome."
      },
      {
        "message": "The discussion has exceeded its assigned container.",
        "culprit": "scope creep",
        "check": "Park unrelated topics and return to the agenda."
      },
      {
        "message": "The call has three note takers and no next action.",
        "culprit": "unclear ownership",
        "check": "Assign owners and deadlines to agreed actions."
      }
    ],
    "network": [
      {
        "message": "Packets are taking a path with character development.",
        "culprit": "the network",
        "check": "Check latency, packet loss, and recent routing changes."
      },
      {
        "message": "The firewall is enforcing a rule nobody remembers adding.",
        "culprit": "a firewall rule",
        "check": "Check recent firewall changes and denied connection logs."
      },
      {
        "message": "The route exists on paper more reliably than on the router.",
        "culprit": "routing configuration",
        "check": "Verify routes and next-hop reachability."
      },
      {
        "message": "The packets are too large for part of the journey.",
        "culprit": "MTU mismatch",
        "check": "Check path MTU and fragmentation behavior."
      },
      {
        "message": "A resolver has retained a memory we would prefer it forgot.",
        "culprit": "stale DNS cache",
        "check": "Compare resolver answers and TTLs."
      },
      {
        "message": "The connection pool is collecting connections without releasing them.",
        "culprit": "connection exhaustion",
        "check": "Inspect active sockets and connection lifecycle."
      },
      {
        "message": "The proxy has developed a shorter attention span.",
        "culprit": "proxy timeout",
        "check": "Compare proxy timeout settings with request latency."
      }
    ],
    "outage": [
      {
        "message": "DNS remains a person of interest.",
        "culprit": "DNS",
        "check": "Verify resolution from multiple networks and inspect recent DNS changes."
      },
      {
        "message": "The certificate has reached the end of its patience.",
        "culprit": "an expired certificate",
        "check": "Check certificate expiration and renewal status."
      },
      {
        "message": "The available capacity and the traffic have stopped agreeing.",
        "culprit": "capacity exhaustion",
        "check": "Compare traffic volume with resource utilization."
      },
      {
        "message": "The load balancer has nobody healthy to talk to.",
        "culprit": "unhealthy backends",
        "check": "Inspect target health and readiness probe results."
      },
      {
        "message": "The incident timeline begins suspiciously close to a release.",
        "culprit": "the last deploy",
        "check": "Compare incident onset with recent releases."
      },
      {
        "message": "The service is waiting on a service that is also waiting.",
        "culprit": "dependency failure",
        "check": "Inspect upstream health and timeout rates."
      },
      {
        "message": "Retries have formed an enthusiastic feedback loop.",
        "culprit": "a retry storm",
        "check": "Inspect retry volume and backoff behavior."
      }
    ],
    "performance": [
      {
        "message": "Timing has become a feature requirement.",
        "culprit": "a race condition",
        "check": "Trace concurrent requests and shared state."
      },
      {
        "message": "The application asks the database the same question repeatedly.",
        "culprit": "N+1 queries",
        "check": "Trace query counts per request."
      },
      {
        "message": "The cache is mostly a decorative object today.",
        "culprit": "low cache hit rate",
        "check": "Measure cache hits, key cardinality, and expiry settings."
      },
      {
        "message": "The payload brought more data than the screen can use.",
        "culprit": "oversized payloads",
        "check": "Inspect response sizes and remove unused fields."
      },
      {
        "message": "The hot path has picked up an unnecessary round trip.",
        "culprit": "serial network calls",
        "check": "Trace dependency ordering and opportunities for concurrency."
      },
      {
        "message": "The CPU is occupied by work nobody measured.",
        "culprit": "expensive computation",
        "check": "Profile CPU usage under representative load."
      },
      {
        "message": "The queue is growing faster than it is being emptied.",
        "culprit": "worker saturation",
        "check": "Compare arrival rate, throughput, and queue age."
      }
    ]
  },
  "excuse": {
    "camera-off": [
      "My connection is unstable, so I am preserving audio quality.",
      "I am keeping video off to reduce distractions.",
      "I am joining in audio-only mode today.",
      "The camera setup needs attention I cannot give it during the call.",
      "I can participate more reliably with video disabled.",
      "I am preserving bandwidth for the shared screen.",
      "My video is unavailable, but I can still follow the discussion."
    ],
    "cancel": [
      "A scheduling conflict makes it impractical to attend.",
      "I overcommitted and need to correct the schedule.",
      "I cannot give this the attention it deserves today.",
      "I agreed before checking my existing commitments.",
      "My available time is smaller than my calendar implied.",
      "I need to reduce the number of things I promised this week.",
      "I should not have treated an empty calendar slot as spare capacity."
    ],
    "code-review": [
      "I am validating the change against the surrounding system before approving it.",
      "The diff is short; the consequences are less compact.",
      "I am following the changed behavior through its callers.",
      "I want to verify the failure path before signing off.",
      "The tests answer most of my questions, but not all of them.",
      "I am checking whether the change affects existing clients.",
      "I need enough time to review more than the formatting."
    ],
    "deadline": [
      "The remaining work needs more validation than planned.",
      "I estimated the visible work and missed the integration work.",
      "The last ten percent brought its own ten percent.",
      "I need another pass to avoid handing over a fragile result.",
      "The original estimate assumed fewer unknowns.",
      "The happy path was quick; the edge cases were not.",
      "I was too optimistic about the review turnaround."
    ],
    "deploy": [
      "The deployment exposed an environment-specific issue that did not reproduce locally.",
      "A configuration difference appeared after release.",
      "The health check found a disagreement with the release plan.",
      "The build passed; the runtime asked follow-up questions.",
      "The rollback plan became the deployment plan.",
      "A dependency behaved differently in the target environment.",
      "The release needs one more configuration check.",
      "Production has provided feedback that staging withheld."
    ],
    "email": [
      "Your message was routed into an unusually busy part of my inbox.",
      "I read it at a bad time and failed to return to it.",
      "I drafted a reply and neglected the sending part.",
      "I let the inbox become a second task manager.",
      "The message needed a longer answer than I had time for.",
      "I missed the follow-up among the other threads.",
      "I should have acknowledged this while checking the details."
    ],
    "late": [
      "I underestimated the travel time and should have communicated sooner.",
      "I left too little margin between commitments.",
      "My estimate did not include the transition time.",
      "I planned for everything to go smoothly. That was optimistic.",
      "I lost track of the time and should have checked earlier.",
      "The previous task ran longer than I allowed for.",
      "I started later than I should have."
    ],
    "leave-early": [
      "I have a prior commitment that needs my attention.",
      "I scheduled the next commitment too close to this one.",
      "I need to leave at the time I originally planned.",
      "I have used the time I had available for this.",
      "I need to make the next handoff on schedule.",
      "My day has less flexibility than I expected.",
      "I cannot extend this session without delaying something else."
    ],
    "meeting": [
      "I am tied up in a meeting that has exceeded its original estimate.",
      "The agenda acquired several unplanned appendices.",
      "We reached the final question and found three more.",
      "The discussion needed a decision before anyone could leave.",
      "The meeting is still working toward its actual purpose.",
      "A short sync became a detailed review.",
      "We are attempting to end the meeting by discussing when to end it."
    ],
    "missed-call": [
      "I was away from my phone and missed the call.",
      "My phone was silenced during focused work.",
      "I saw the call after it had already ended.",
      "I was in another conversation and could not pick up.",
      "I missed the notification while switching tasks.",
      "I could not answer at that moment.",
      "I had notifications paused and forgot to check them."
    ],
    "outage": [
      "An upstream dependency is not responding consistently.",
      "A service dependency stopped cooperating with our assumptions.",
      "A configuration change had a wider effect than expected.",
      "The recovery procedure is taking longer than the diagram suggested.",
      "The system reached a limit that normal traffic had not tested.",
      "We are validating the fix before restoring full traffic.",
      "The incident has more than one contributing factor."
    ],
    "reply": [
      "I needed time to verify the details before replying.",
      "I was trying to give you an answer instead of a guess.",
      "I needed to check one detail, which became several.",
      "I delayed replying because I had not resolved the question.",
      "I had the reply in my head, which was not useful to you.",
      "I should have sent an interim update sooner.",
      "I was waiting on information that did not arrive when expected."
    ],
    "school": [
      "I misjudged the time required for the assignment.",
      "I spent too long on the first part of the assignment.",
      "I misunderstood the scope and needed to restart.",
      "I should have asked for clarification earlier.",
      "My study plan assumed concentration on demand.",
      "I did not leave enough time to check the final submission.",
      "I focused on the wrong section before reviewing the rubric."
    ],
    "work": [
      "A higher-priority incident required immediate attention.",
      "The small task turned out to have a basement.",
      "I spent the morning resolving an unexpected dependency.",
      "The priority order changed before the work was complete.",
      "I needed to clean up earlier work before proceeding.",
      "A routine check uncovered additional work.",
      "I underestimated how much uninterrupted time this needed."
    ]
  },
  "reason": {
    "cancel": [
      "We need to cancel because the necessary conditions are not in place.",
      "The planned work no longer serves the current goal.",
      "We cannot proceed within the available resources.",
      "The prerequisites will not be ready in time.",
      "The expected benefit no longer justifies the effort.",
      "We need to stop this before further commitments accumulate.",
      "The scope has changed enough to require a new plan."
    ],
    "decline": [
      "We cannot take this on without compromising current commitments.",
      "I do not have the capacity to do this well.",
      "This falls outside the work I can currently support.",
      "I cannot commit to the requested timeline.",
      "Taking this on would delay existing obligations.",
      "I am not the right person for this particular task.",
      "I need to keep my current workload manageable."
    ],
    "delay": [
      "Additional validation is needed before we can proceed safely.",
      "The dependency is not ready for the next step.",
      "We need to verify the result before release.",
      "An unresolved requirement is affecting the schedule.",
      "The review needs more time than originally allocated.",
      "We are addressing a failure found during testing.",
      "Delivery is delayed while we confirm the acceptance criteria."
    ],
    "leave-early": [
      "I need to leave early to handle a prior commitment.",
      "I have reached the end of my available time today.",
      "I need to wrap up now to meet another obligation.",
      "I cannot stay for the full session.",
      "I need to leave before the remaining discussion.",
      "My availability ends here; I will read the notes.",
      "I need to hand off the rest of this session."
    ],
    "maintenance": [
      "Scheduled maintenance is required to keep the service reliable.",
      "A component update requires a planned interruption.",
      "We need to validate the system after infrastructure changes.",
      "The service needs routine work that cannot run during normal traffic.",
      "We are replacing a component before it becomes a failure.",
      "The maintenance window allows controlled testing and recovery.",
      "We need to apply configuration changes and verify their effect."
    ],
    "pause": [
      "We are pausing to resolve the open risks first.",
      "We need to establish the facts before continuing.",
      "The current approach needs review before more work accumulates.",
      "We are waiting for a decision that changes the scope.",
      "Continuing now would create avoidable rework.",
      "The next step requires a confirmed owner.",
      "We need a clear success criterion before proceeding."
    ],
    "rate-limit": [
      "Requests are being limited to keep the service available for everyone.",
      "The request rate exceeds the current allowance.",
      "Please space requests out to avoid exhausting shared capacity.",
      "A burst of traffic has used the available request budget.",
      "The service needs clients to back off before retrying.",
      "This limit keeps one workload from consuming all capacity.",
      "Please wait for the current window to reset."
    ],
    "reject": [
      "The proposal does not meet the current requirements.",
      "The change introduces a risk we have not addressed.",
      "The evidence does not support the proposed conclusion.",
      "The implementation does not satisfy the acceptance criteria.",
      "The costs exceed the resources available for this work.",
      "The design leaves a required use case unsupported.",
      "The proposal needs a clearer recovery plan."
    ],
    "reschedule": [
      "The required participants are not available at the planned time.",
      "We need enough time for a useful discussion.",
      "The prerequisite work will finish after the original slot.",
      "A later time will allow us to bring the necessary information.",
      "The original timing no longer fits the project sequence.",
      "We need to find a slot with the decision-makers available.",
      "Moving this will avoid a conflict with committed work."
    ],
    "rollback": [
      "We are rolling back to restore a known-good state.",
      "The new version is causing unexpected failures.",
      "The release does not meet the current health criteria.",
      "Restoring the previous version reduces the immediate impact.",
      "We need to recover service before investigating further.",
      "The change introduced a regression that requires more testing.",
      "We are returning to the last verified configuration."
    ],
    "skip-meeting": [
      "An asynchronous update will be more useful than another meeting.",
      "There is no decision requiring a live discussion.",
      "The written update covers my contribution.",
      "I need to protect time for the work being discussed.",
      "I can provide feedback in the shared document.",
      "My attendance would not change the next step.",
      "The agenda can be resolved asynchronously."
    ]
  },
  "status": {
    "blocked": [
      "Blocked pending an answer, access, or a small miracle.",
      "Progress requires a decision on the open question.",
      "Waiting for access before implementation can continue.",
      "The next step depends on an unresolved prerequisite.",
      "Blocked by a dependency outside this task.",
      "A missing requirement is holding up delivery.",
      "Work is paused at a documented blocker."
    ],
    "broken": [
      "Broken, but now with a ticket and a theory.",
      "Service is down. Recovery work is underway.",
      "The system is currently unable to serve requests.",
      "An active incident is blocking normal operation.",
      "Availability is interrupted while we work on recovery.",
      "The service needs repair before normal use can resume.",
      "Current state: unavailable, with attention attached."
    ],
    "degraded": [
      "Degraded service. Some parts are taking the scenic route.",
      "Some requests are slower than expected.",
      "Partial disruption. Core functions remain available.",
      "Elevated errors are affecting a subset of requests.",
      "Service is available with reduced capacity.",
      "Performance is below normal; investigation continues.",
      "Some features are temporarily unreliable."
    ],
    "deploying": [
      "Deploying. Please avoid startling production.",
      "Deployment in progress. The buttons are being pressed carefully.",
      "Rolling out the new version in stages.",
      "Release in progress. Watching the health checks.",
      "Updating the service and checking each step.",
      "Deploying. Rollback remains within reach.",
      "The release is moving through its checkpoints.",
      "New code is meeting real traffic."
    ],
    "done": [
      "Complete. The thing now does the thing.",
      "Work complete and ready for handoff.",
      "Finished. The remaining task is to stop touching it.",
      "Delivered with the checks recorded.",
      "The requested outcome is now available.",
      "Completed and awaiting final review.",
      "All planned work is finished."
    ],
    "friday": [
      "Friday mode: changes are being evaluated with unusual skepticism.",
      "Keeping the change small enough to explain on Monday.",
      "Friday status: the rollback plan has been reread.",
      "Shipping only what the weekend can tolerate.",
      "Closing loops before opening new ones.",
      "Today favors documentation over architectural surprises.",
      "The release calendar is asking sensible questions."
    ],
    "investigating": [
      "Investigating. We have several theories and one suspicious log line.",
      "Tracing the failure back to its first useful clue.",
      "Checking recent changes against the incident timeline.",
      "Narrowing the scope before choosing a fix.",
      "Collecting evidence. Guessing is still optional.",
      "Reviewing logs and testing the leading hypothesis.",
      "The symptoms are clear; the cause is being checked."
    ],
    "maintenance": [
      "Maintenance in progress. Expected disruption is intentional.",
      "Applying scheduled updates to the service.",
      "Routine maintenance is underway.",
      "Updating components and verifying recovery.",
      "Maintenance window active. Some interruptions are expected.",
      "Performing planned work on the infrastructure.",
      "Service checks will follow the maintenance steps."
    ],
    "offline": [
      "Offline for maintenance. We will return with fewer mysteries.",
      "Currently offline. Messages can wait in the queue.",
      "Unavailable until the next scheduled session.",
      "Disconnected for now; no live updates are expected.",
      "Offline. The keyboard is taking a scheduled rest.",
      "The service is not accepting live connections.",
      "Away from the system at present."
    ],
    "waiting": [
      "Waiting on a dependency with its own feelings.",
      "Waiting for the next required input.",
      "Ready to continue when the dependency completes.",
      "The next step is awaiting confirmation.",
      "Queued behind work that must finish first.",
      "Waiting. Refreshing harder has not helped.",
      "No action is available until the handoff arrives."
    ],
    "working": [
      "Working on it. The computer has been informed.",
      "In progress. Momentum is plausible.",
      "Work continues. The difficult part has a name now.",
      "Making progress one resolved question at a time.",
      "Still working. The checklist is shrinking.",
      "Implementation is underway.",
      "In progress, with fewer unknowns than yesterday.",
      "The current task is moving forward."
    ]
  }
} as const;
export const categoryMetadata = {
  "ack": {
    "approved": {
      "slug": "approved",
      "name": "Approved",
      "description": "Ack responses for approved.",
      "aliases": []
    },
    "begrudging": {
      "slug": "begrudging",
      "name": "Begrudging",
      "description": "Ack responses for begrudging.",
      "aliases": []
    },
    "done": {
      "slug": "done",
      "name": "Done",
      "description": "Ack responses for done.",
      "aliases": []
    },
    "noted": {
      "slug": "noted",
      "name": "Noted",
      "description": "Ack responses for noted.",
      "aliases": []
    },
    "received": {
      "slug": "received",
      "name": "Received",
      "description": "Ack responses for received.",
      "aliases": [
        "receipt"
      ]
    },
    "rejected": {
      "slug": "rejected",
      "name": "Rejected",
      "description": "Ack responses for rejected.",
      "aliases": []
    },
    "seen": {
      "slug": "seen",
      "name": "Seen",
      "description": "Ack responses for seen.",
      "aliases": []
    },
    "thanks": {
      "slug": "thanks",
      "name": "Thanks",
      "description": "Ack responses for thanks.",
      "aliases": []
    },
    "understood": {
      "slug": "understood",
      "name": "Understood",
      "description": "Ack responses for understood.",
      "aliases": []
    },
    "will-do": {
      "slug": "will-do",
      "name": "Will Do",
      "description": "Ack responses for will do.",
      "aliases": []
    }
  },
  "blame": {
    "backend": {
      "slug": "backend",
      "name": "Backend",
      "description": "Blame responses for backend.",
      "aliases": []
    },
    "ci": {
      "slug": "ci",
      "name": "Ci",
      "description": "Blame responses for ci.",
      "aliases": []
    },
    "database": {
      "slug": "database",
      "name": "Database",
      "description": "Blame responses for database.",
      "aliases": []
    },
    "deadline": {
      "slug": "deadline",
      "name": "Deadline",
      "description": "Blame responses for deadline.",
      "aliases": []
    },
    "deploy": {
      "slug": "deploy",
      "name": "Deploy",
      "description": "Blame responses for deploy.",
      "aliases": []
    },
    "frontend": {
      "slug": "frontend",
      "name": "Frontend",
      "description": "Blame responses for frontend.",
      "aliases": []
    },
    "general": {
      "slug": "general",
      "name": "General",
      "description": "Blame responses for general.",
      "aliases": []
    },
    "meeting": {
      "slug": "meeting",
      "name": "Meeting",
      "description": "Blame responses for meeting.",
      "aliases": []
    },
    "network": {
      "slug": "network",
      "name": "Network",
      "description": "Blame responses for network.",
      "aliases": []
    },
    "outage": {
      "slug": "outage",
      "name": "Outage",
      "description": "Blame responses for outage.",
      "aliases": []
    },
    "performance": {
      "slug": "performance",
      "name": "Performance",
      "description": "Blame responses for performance.",
      "aliases": []
    }
  },
  "excuse": {
    "camera-off": {
      "slug": "camera-off",
      "name": "Camera Off",
      "description": "Excuse responses for camera off.",
      "aliases": []
    },
    "cancel": {
      "slug": "cancel",
      "name": "Cancel",
      "description": "Excuse responses for cancel.",
      "aliases": []
    },
    "code-review": {
      "slug": "code-review",
      "name": "Code Review",
      "description": "Excuse responses for code review.",
      "aliases": []
    },
    "deadline": {
      "slug": "deadline",
      "name": "Deadline",
      "description": "Excuse responses for deadline.",
      "aliases": []
    },
    "deploy": {
      "slug": "deploy",
      "name": "Deploy",
      "description": "Excuse responses for deploy.",
      "aliases": []
    },
    "email": {
      "slug": "email",
      "name": "Email",
      "description": "Excuse responses for email.",
      "aliases": []
    },
    "late": {
      "slug": "late",
      "name": "Late",
      "description": "Excuse responses for late.",
      "aliases": []
    },
    "leave-early": {
      "slug": "leave-early",
      "name": "Leave Early",
      "description": "Excuse responses for leave early.",
      "aliases": []
    },
    "meeting": {
      "slug": "meeting",
      "name": "Meeting",
      "description": "Excuse responses for meeting.",
      "aliases": []
    },
    "missed-call": {
      "slug": "missed-call",
      "name": "Missed Call",
      "description": "Excuse responses for missed call.",
      "aliases": []
    },
    "outage": {
      "slug": "outage",
      "name": "Outage",
      "description": "Excuse responses for outage.",
      "aliases": []
    },
    "reply": {
      "slug": "reply",
      "name": "Reply",
      "description": "Excuse responses for reply.",
      "aliases": []
    },
    "school": {
      "slug": "school",
      "name": "School",
      "description": "Excuse responses for school.",
      "aliases": []
    },
    "work": {
      "slug": "work",
      "name": "Work",
      "description": "Excuse responses for work.",
      "aliases": []
    }
  },
  "reason": {
    "cancel": {
      "slug": "cancel",
      "name": "Cancel",
      "description": "Reason responses for cancel.",
      "aliases": []
    },
    "decline": {
      "slug": "decline",
      "name": "Decline",
      "description": "Reason responses for decline.",
      "aliases": []
    },
    "delay": {
      "slug": "delay",
      "name": "Delay",
      "description": "Reason responses for delay.",
      "aliases": []
    },
    "leave-early": {
      "slug": "leave-early",
      "name": "Leave Early",
      "description": "Reason responses for leave early.",
      "aliases": []
    },
    "maintenance": {
      "slug": "maintenance",
      "name": "Maintenance",
      "description": "Reason responses for maintenance.",
      "aliases": []
    },
    "pause": {
      "slug": "pause",
      "name": "Pause",
      "description": "Reason responses for pause.",
      "aliases": []
    },
    "rate-limit": {
      "slug": "rate-limit",
      "name": "Rate Limit",
      "description": "Reason responses for rate limit.",
      "aliases": []
    },
    "reject": {
      "slug": "reject",
      "name": "Reject",
      "description": "Reason responses for reject.",
      "aliases": []
    },
    "reschedule": {
      "slug": "reschedule",
      "name": "Reschedule",
      "description": "Reason responses for reschedule.",
      "aliases": []
    },
    "rollback": {
      "slug": "rollback",
      "name": "Rollback",
      "description": "Reason responses for rollback.",
      "aliases": []
    },
    "skip-meeting": {
      "slug": "skip-meeting",
      "name": "Skip Meeting",
      "description": "Reason responses for skip meeting.",
      "aliases": []
    }
  },
  "status": {
    "blocked": {
      "slug": "blocked",
      "name": "Blocked",
      "description": "Status responses for blocked.",
      "aliases": []
    },
    "broken": {
      "slug": "broken",
      "name": "Broken",
      "description": "Status responses for broken.",
      "aliases": []
    },
    "degraded": {
      "slug": "degraded",
      "name": "Degraded",
      "description": "Status responses for degraded.",
      "aliases": []
    },
    "deploying": {
      "slug": "deploying",
      "name": "Deploying",
      "description": "Status responses for deploying.",
      "aliases": []
    },
    "done": {
      "slug": "done",
      "name": "Done",
      "description": "Status responses for done.",
      "aliases": []
    },
    "friday": {
      "slug": "friday",
      "name": "Friday",
      "description": "Status responses for friday.",
      "aliases": []
    },
    "investigating": {
      "slug": "investigating",
      "name": "Investigating",
      "description": "Status responses for investigating.",
      "aliases": []
    },
    "maintenance": {
      "slug": "maintenance",
      "name": "Maintenance",
      "description": "Status responses for maintenance.",
      "aliases": []
    },
    "offline": {
      "slug": "offline",
      "name": "Offline",
      "description": "Status responses for offline.",
      "aliases": []
    },
    "waiting": {
      "slug": "waiting",
      "name": "Waiting",
      "description": "Status responses for waiting.",
      "aliases": []
    },
    "working": {
      "slug": "working",
      "name": "Working",
      "description": "Status responses for working.",
      "aliases": []
    }
  }
} as const;
