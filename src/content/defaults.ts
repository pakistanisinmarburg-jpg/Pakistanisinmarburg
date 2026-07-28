export interface ContentDef {
  label: string;
  group: string;
  value: string;
  multiline?: boolean;
}

/**
 * Every editable text on the public site.
 * Admins can override any of these from /admin (Content tab).
 */
export const CONTENT_DEFAULTS: Record<string, ContentDef> = {
  "home.hero.title": { label: "Hero title", group: "Home", value: "Pakistanis in Marburg" },
  "home.hero.subtitle": {
    label: "Hero subtitle",
    group: "Home",
    multiline: true,
    value:
      "A home for Pakistani students, families, and professionals—connecting, supporting, and celebrating life in Marburg, Germany's historic university city.",
  },
  "home.events.title": { label: "Upcoming events heading", group: "Home", value: "Upcoming Events in 2026" },
  "home.events.subtitle": { label: "Upcoming events subheading", group: "Home", value: "Join us at our next community gathering" },
  "home.cta.title": { label: "Call-to-action heading", group: "Home", value: "Become a Member" },
  "home.cta.text": {
    label: "Call-to-action text",
    group: "Home",
    multiline: true,
    value:
      "Join our growing community to stay updated on events, access member resources, and connect with fellow Pakistanis in Marburg.",
  },
  "home.cta.button": { label: "Call-to-action button", group: "Home", value: "Register Now" },

  "events.hero.title": { label: "Hero title", group: "Events", value: "Community Events in 2026" },
  "events.hero.subtitle": {
    label: "Hero subtitle",
    group: "Events",
    multiline: true,
    value: "Celebrate culture, connect with community, and create lasting memories",
  },
  "events.list.title": { label: "List heading", group: "Events", value: "All Events in 2026" },
  "events.list.subtitle": {
    label: "List subheading",
    group: "Events",
    multiline: true,
    value:
      'Join us at our cultural celebrations, sports events, and community gatherings throughout the year. Click "Register Now" to sign up!',
  },
  "events.info.title": { label: "Info heading", group: "Events", value: "Stay Updated" },
  "events.info.text": {
    label: "Info text",
    group: "Events",
    multiline: true,
    value:
      "New events are added regularly. Join our community to receive event notifications, RSVP for gatherings, and never miss an opportunity to connect.",
  },
  "events.info.details": {
    label: "Event information box",
    group: "Events",
    multiline: true,
    value:
      "Most events are free for community members. Some special events may require tickets or registration. We welcome families, students, professionals, and friends of Pakistan.",
  },

  "gallery.hero.title": { label: "Hero title", group: "Gallery", value: "Gallery" },
  "gallery.hero.subtitle": {
    label: "Hero subtitle",
    group: "Gallery",
    multiline: true,
    value: "Memories from our community events and gatherings",
  },
  "gallery.videos.title": { label: "Videos heading", group: "Gallery", value: "Event Videos" },
  "gallery.videos.subtitle": { label: "Videos subheading", group: "Gallery", value: "Watch highlights from our community events" },

  "about.hero.title": { label: "Hero title", group: "About", value: "About Us" },
  "about.hero.subtitle": {
    label: "Hero subtitle",
    group: "About",
    multiline: true,
    value: "Connecting Pakistani families, students, and professionals in Marburg",
  },

  "students.hero.title": { label: "Hero title", group: "Students", value: "Pakistani Student Association Marburg" },
  "students.hero.subtitle": {
    label: "Hero subtitle",
    group: "Students",
    multiline: true,
    value: "Supporting Pakistani students at University of Marburg from arrival to graduation",
  },

  "contact.hero.title": { label: "Hero title", group: "Contact", value: "Get in Touch" },
  "contact.hero.subtitle": {
    label: "Hero subtitle",
    group: "Contact",
    multiline: true,
    value: "We're here to help you connect with the community",
  },

  "join.hero.title": { label: "Hero title", group: "Join", value: "Become a Member" },
  "join.hero.subtitle": {
    label: "Hero subtitle",
    group: "Join",
    multiline: true,
    value: "Join our growing community and stay connected",
  },

  "mentor.hero.title": { label: "Hero title", group: "Mentor", value: "Request a Mentor" },
  "mentor.hero.subtitle": {
    label: "Hero subtitle",
    group: "Mentor",
    multiline: true,
    value: "Get guidance from experienced Pakistani students and professionals",
  },
};

export type ContentKey = keyof typeof CONTENT_DEFAULTS;
