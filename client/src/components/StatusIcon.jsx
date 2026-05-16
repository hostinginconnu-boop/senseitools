export default function StatusIcon({ status }) {
  if (status === "sent") {
    return (
      <svg viewBox="0 0 16 11" width="14" height="11" style={{ display: "inline", marginLeft: 3, verticalAlign: "middle" }}>
        <path d="M11.071.653a.5.5 0 0 0-.707 0L5.5 5.517 4.136 4.153a.5.5 0 1 0-.707.707l1.718 1.718a.5.5 0 0 0 .707 0l5.217-5.218a.5.5 0 0 0 0-.707z" fill="#8696a0"/>
      </svg>
    );
  }
  if (status === "delivered") {
    return (
      <svg viewBox="0 0 16 11" width="16" height="11" style={{ display: "inline", marginLeft: 3, verticalAlign: "middle" }}>
        <path d="M15.01.653a.5.5 0 0 0-.707 0L7.53 7.424 5.36 5.25a.5.5 0 0 0-.708.707l2.524 2.525a.5.5 0 0 0 .707 0L15.01 1.36a.5.5 0 0 0 0-.707zM.99 7.957l2.524 2.525a.5.5 0 0 0 .707 0l.96-.96-.707-.707-.607.606L1.697 7.25A.5.5 0 0 0 .99 7.957z" fill="#8696a0"/>
      </svg>
    );
  }
  if (status === "read") {
    return (
      <svg viewBox="0 0 16 11" width="16" height="11" style={{ display: "inline", marginLeft: 3, verticalAlign: "middle" }}>
        <path d="M15.01.653a.5.5 0 0 0-.707 0L7.53 7.424 5.36 5.25a.5.5 0 0 0-.708.707l2.524 2.525a.5.5 0 0 0 .707 0L15.01 1.36a.5.5 0 0 0 0-.707zM.99 7.957l2.524 2.525a.5.5 0 0 0 .707 0l.96-.96-.707-.707-.607.606L1.697 7.25A.5.5 0 0 0 .99 7.957z" fill="#53bdeb"/>
      </svg>
    );
  }
  return null;
}
