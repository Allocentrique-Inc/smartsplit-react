export function useMajorContributors(rightHolders) {
  return rightHolders.filter(
    (shareholder) => shareholder.status && shareholder.status !== 'session',
  );
}

export function useMinorContributors(rightHolders) {
  return rightHolders.filter(
    (shareholder) => shareholder.status && shareholder.status === 'session',
  );
}
