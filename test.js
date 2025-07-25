const advanceParam = [
    {
        key: "rT6k",
        parameterName: "cubrid_port_id",
        parameterType: "client parameter",
        valueType: "int",
        parameterValue: "1,523",
        property: { type: "number" }
    },
    {
        key: "mN2p",
        parameterName: "check_peer_alive",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "both",
        property: { type: "text" }
    },
    {
        key: "vX9q",
        parameterName: "db_hosts",
        parameterType: "client parameter",
        valueType: "string",
        parameterValue: "NULL",
        property: { type: "text" }
    },
    {
        key: "zF4t",
        parameterName: "max_clients",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "100",
        property: { type: "number" }
    },
    {
        key: "kL7w",
        parameterName: "tcp_keepalive",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "pQ3m",
        parameterName: "data_buffer_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "32,768 * db_page_size",
        property: { type: "number" }
    },
    {
        key: "eR8v",
        parameterName: "index_scan_oid_buffer_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "4 * db_page_size",
        property: { type: "number" }
    },
    {
        key: "nT5x",
        parameterName: "max_agg_hash_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "2,097,152(2M)",
        property: { type: "number" }
    },
    {
        key: "yM2u",
        parameterName: "max_hash_list_scan_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "8,388,608(8M)",
        property: { type: "number" }
    },
    {
        key: "cK9r",
        parameterName: "sort_buffer_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "128 * db_page_size",
        property: { type: "number" }
    },
    {
        key: "wP4t",
        parameterName: "temp_file_memory_size_in_pages",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "4",
        property: { type: "number" }
    },
    {
        key: "jH6q",
        parameterName: "thread_stacksize",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "1,048,576",
        property: { type: "number" }
    },
    {
        key: "bN3m",
        parameterName: "db_volume_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "512M",
        property: { type: "number" }
    },
    {
        key: "tV7x",
        parameterName: "dont_reuse_heap_file",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "qR2p",
        parameterName: "log_volume_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "512M",
        property: { type: "number" }
    },
    {
        key: "mF9v",
        parameterName: "temp_file_max_size_in_pages",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "-1",
        property: { type: "number" }
    },
    {
        key: "xT4w",
        parameterName: "temp_volume_path",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "NULL",
        property: { type: "text" }
    },
    {
        key: "kM6u",
        parameterName: "unfill_factor",
        parameterType: "server parameter",
        valueType: "float",
        parameterValue: "0.1",
        property: { type: "number" }
    },
    {
        key: "pQ3r",
        parameterName: "volume_extension_path",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "NULL",
        property: { type: "text" }
    },
    {
        key: "eN8t",
        parameterName: "double_write_buffer_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "2M",
        property: { type: "number" }
    },
    {
        key: "yR5m",
        parameterName: "data_file_os_advise",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "cK2q",
        parameterName: "call_stack_dump_activation_list",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "DEFAULT",
        property: { type: "text" }
    },
    {
        key: "wP9x",
        parameterName: "call_stack_dump_deactivation_list",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "NULL",
        property: { type: "text" }
    },
    {
        key: "jH4v",
        parameterName: "call_stack_dump_on_error",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bT7u",
        parameterName: "error_log",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "cub_client.err, cub_server.err",
        property: { type: "text" }
    },
    {
        key: "rM3p",
        parameterName: "error_log_level",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "NOTIFICATION",
        property: { type: "text" }
    },
    {
        key: "qF6t",
        parameterName: "error_log_warning",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "xN2r",
        parameterName: "error_log_size",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "512M",
        property: { type: "number" }
    },
    {
        key: "kV8w",
        parameterName: "deadlock_detection_interval_in_secs",
        parameterType: "server parameter",
        valueType: "float",
        parameterValue: "1.0",
        property: { type: "number" }
    },
    {
        key: "pQ4m",
        parameterName: "isolation_level",
        parameterType: "client parameter",
        valueType: "int",
        parameterValue: "4",
        property: { type: "number" }
    },
    {
        key: "eR9x",
        parameterName: "lock_escalation",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "100,000",
        property: { type: "number" }
    },
    {
        key: "yT5v",
        parameterName: "lock_timeout",
        parameterType: "client parameter",
        valueType: "msec",
        parameterValue: "-1",
        property: { type: "number" }
    },
    {
        key: "cM2u",
        parameterName: "rollback_on_lock_escalation",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "wF7q",
        parameterName: "adaptive_flush_control",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "jN3t",
        parameterName: "background_archiving",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bK8r",
        parameterName: "checkpoint_every_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "100,000 * log_page_size",
        property: { type: "number" }
    },
    {
        key: "rV4p",
        parameterName: "checkpoint_interval",
        parameterType: "server parameter",
        valueType: "msec",
        parameterValue: "6min",
        property: { type: "number" }
    },
    {
        key: "qM9w",
        parameterName: "checkpoint_sleep_msecs",
        parameterType: "server parameter",
        valueType: "msec",
        parameterValue: "1",
        property: { type: "number" }
    },
    {
        key: "xT6u",
        parameterName: "force_remove_log_archives",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "kF2x",
        parameterName: "log_buffer_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "16k * log_page_size",
        property: { type: "number" }
    },
    {
        key: "pN7t",
        parameterName: "log_max_archives",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "INT_MAX",
        property: { type: "number" }
    },
    {
        key: "eQ3m",
        parameterName: "log_trace_flush_time",
        parameterType: "server parameter",
        valueType: "msec",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "yR8v",
        parameterName: "max_flush_size_per_second",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "10,000 * db_page_size",
        property: { type: "number" }
    },
    {
        key: "cT4q",
        parameterName: "remove_log_archive_interval_in_secs",
        parameterType: "server parameter",
        valueType: "sec",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "wM9r",
        parameterName: "sync_on_flush_size",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "200 * db_page_size",
        property: { type: "number" }
    },
    {
        key: "jF5p",
        parameterName: "ddl_audit_log",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bN2u",
        parameterName: "ddl_audit_log_size",
        parameterType: "client parameter",
        valueType: "byte",
        parameterValue: "10M",
        property: { type: "number" }
    },
    {
        key: "rK7x",
        parameterName: "async_commit",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "qV3t",
        parameterName: "group_commit_interval_in_msecs",
        parameterType: "server parameter",
        valueType: "msec",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "xM8q",
        parameterName: "add_column_update_hard_default",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "kT4r",
        parameterName: "alter_table_change_type_strict",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "pF9w",
        parameterName: "allow_truncated_string",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "eN2u",
        parameterName: "ansi_quotes",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "yQ7t",
        parameterName: "block_ddl_statement",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "cR3m",
        parameterName: "block_nowhere_statement",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "wT8x",
        parameterName: "compat_numeric_division_scale",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "jM4v",
        parameterName: "create_table_reuseoid",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bF9q",
        parameterName: "cte_max_recursions",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "2000",
        property: { type: "number" }
    },
    {
        key: "rN2p",
        parameterName: "default_week_format",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "qK7r",
        parameterName: "group_concat_max_len",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "1,024",
        property: { type: "number" }
    },
    {
        key: "xV3t",
        parameterName: "intl_check_input_string",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "kM8u",
        parameterName: "intl_collation",
        parameterType: "client parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "pT4q",
        parameterName: "intl_date_lang",
        parameterType: "client parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "eF9x",
        parameterName: "intl_number_lang",
        parameterType: "client parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "yN2m",
        parameterName: "json_max_array_idx",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "65,536",
        property: { type: "text" }
    },
    {
        key: "cQ7v",
        parameterName: "no_backslash_escapes",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "wR3t",
        parameterName: "only_full_group_by",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "jT8p",
        parameterName: "oracle_style_empty_string",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bM4r",
        parameterName: "pipes_as_concat",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "rF9u",
        parameterName: "plus_as_concat",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "qN2w",
        parameterName: "require_like_escape_character",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "xK7t",
        parameterName: "return_null_on_function_errors",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "kV3q",
        parameterName: "string_max_size_bytes",
        parameterType: "client/server parameter",
        valueType: "byte",
        parameterValue: "1,048,576",
        property: { type: "number" }
    },
    {
        key: "pM8x",
        parameterName: "unicode_input_normalization",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "eT4v",
        parameterName: "unicode_output_normalization",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "yF9p",
        parameterName: "update_use_attribute_references",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "cN2r",
        parameterName: "thread_connection_pooling",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "wQ7u",
        parameterName: "thread_connection_timeout_seconds",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "300",
        property: { type: "number" }
    },
    {
        key: "jR3t",
        parameterName: "thread_worker_pooling",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bT8m",
        parameterName: "thread_core_count",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "# of system cores",
        property: { type: "number" }
    },
    {
        key: "rM4q",
        parameterName: "thread_worker_timeout_seconds",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "300",
        property: { type: "number" }
    },
    {
        key: "qF9x",
        parameterName: "loaddb_worker_count",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "8",
        property: { type: "number" }
    },
    {
        key: "xN2v",
        parameterName: "server_timezone",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "OS timezone",
        property: { type: "text" }
    },
    {
        key: "kQ7p",
        parameterName: "timezone",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "the value of server_timezone",
        property: { type: "text" }
    },
    {
        key: "pR3u",
        parameterName: "tz_leap_second_support",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "eT8t",
        parameterName: "max_plan_cache_entries",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "1,000",
        property: { type: "number" }
    },
    {
        key: "yM4r",
        parameterName: "max_plan_cache_clones",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "1,000",
        property: { type: "number" }
    },
    {
        key: "cF9w",
        parameterName: "xasl_cache_time_threshold_in_minutes",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "360",
        property: { type: "number" }
    },
    {
        key: "wN2q",
        parameterName: "max_filter_pred_cache_entries",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "1,000",
        property: { type: "number" }
    },
    {
        key: "jQ7x",
        parameterName: "max_query_cache_entries",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "bR3v",
        parameterName: "query_cache_size_in_pages",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "rT8p",
        parameterName: "backup_volume_max_size_bytes",
        parameterType: "server parameter",
        valueType: "byte",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "qM4u",
        parameterName: "communication_histogram",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "xF9t",
        parameterName: "compactdb_page_reclaim_only",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "kN2r",
        parameterName: "csql_history_num",
        parameterType: "client parameter",
        valueType: "int",
        parameterValue: "50",
        property: { type: "number" }
    },
    {
        key: "pQ7m",
        parameterName: "ha_mode",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "off",
        property: { type: "text" }
    },
    {
        key: "eR3x",
        parameterName: "access_ip_control",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "yT8v",
        parameterName: "access_ip_control_file",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "cM4q",
        parameterName: "agg_hash_respect_order",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "wF9p",
        parameterName: "auto_restart_server",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "jN2u",
        parameterName: "enable_string_compression",
        parameterType: "client/server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "bQ7t",
        parameterName: "index_scan_in_oid_order",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "rR3r",
        parameterName: "index_unfill_factor",
        parameterType: "server parameter",
        valueType: "float",
        parameterValue: "0.05",
        property: { type: "number" }
    },
    {
        key: "qT8w",
        parameterName: "java_stored_procedure",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "xM4q",
        parameterName: "java_stored_procedure_port",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "kF9x",
        parameterName: "java_stored_procedure_uds",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "pN2v",
        parameterName: "java_stored_procedure_jvm_options",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "eQ7p",
        parameterName: "multi_range_optimization_limit",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "100",
        property: { type: "number" }
    },
    {
        key: "yR3u",
        parameterName: "optimizer_enable_merge_join",
        parameterType: "client parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "cT8t",
        parameterName: "use_stat_estimation",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "wM4r",
        parameterName: "pthread_scope_process",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "jF9w",
        parameterName: "server",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "bN2q",
        parameterName: "service",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "",
        property: { type: "text" }
    },
    {
        key: "rQ7x",
        parameterName: "session_state_timeout",
        parameterType: "server parameter",
        valueType: "sec",
        parameterValue: "21,600",
        property: { type: "number" }
    },
    {
        key: "qR3v",
        parameterName: "sort_limit_max_count",
        parameterType: "client parameter",
        valueType: "int",
        parameterValue: "1,000",
        property: { type: "number" }
    },
    {
        key: "xT8p",
        parameterName: "sql_trace_slow",
        parameterType: "server parameter",
        valueType: "msec",
        parameterValue: "-1",
        property: { type: "number" }
    },
    {
        key: "kM4u",
        parameterName: "sql_trace_execution_plan",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "pF9t",
        parameterName: "use_orderby_sort_limit",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "yes",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "eN2r",
        parameterName: "vacuum_prefetch_log_mode",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "1",
        property: { type: "number" }
    },
    {
        key: "yQ7m",
        parameterName: "vacuum_prefetch_log_buffer_size",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "3200 * log_page_size",
        property: { type: "number" }
    },
    {
        key: "cR3x",
        parameterName: "data_buffer_neighbor_flush_pages",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "8",
        property: { type: "number" }
    },
    {
        key: "wT8v",
        parameterName: "data_buffer_neighbor_flush_nondirty",
        parameterType: "server parameter",
        valueType: "bool",
        parameterValue: "no",
        property: { type: "select", value: ["yes", "no"] }
    },
    {
        key: "jM4q",
        parameterName: "tde_keys_file_path",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "NULL",
        property: { type: "text" }
    },
    {
        key: "bF9p",
        parameterName: "tde_default_algorithm",
        parameterType: "server parameter",
        valueType: "string",
        parameterValue: "AES",
        property: { type: "text" }
    },
    {
        key: "rN2u",
        parameterName: "recovery_progress_logging_interval",
        parameterType: "server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "qK7t",
        parameterName: "supplemental_log",
        parameterType: "client/server parameter",
        valueType: "int",
        parameterValue: "0",
        property: { type: "number" }
    },
    {
        key: "xV3r",
        parameterName: "regexp_engine",
        parameterType: "client/server parameter",
        valueType: "string",
        parameterValue: "re2",
        property: { type: "text" }
    }
]




let dd = advanceParam.map(item=>{
    if(item.valueType === "number"){

    }
})