-- Removes the two test submissions made while verifying submit_support_message()
-- end to end (one via a Node script calling the RPC as anon, one via the
-- browser testing the actual SupportSheet UI) during the Child Safety
-- Standards fix. Not real user data; see 20261001070000_support_messages.sql.
DELETE FROM public.support_messages
WHERE message LIKE '[automated test]%' OR message LIKE '[browser test]%';
