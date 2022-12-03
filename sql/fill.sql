CREATE SEQUENCE public.counter_info_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;
ALTER SEQUENCE public.counter_info_id_seq OWNER TO postgres;
CREATE TABLE public.counter_info (
    id integer NOT NULL DEFAULT nextval('counter_info_id_seq'::regclass),
    datetime timestamp with time zone NOT NULL DEFAULT now(),
    client_info character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT counter_info_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE public.counter_info OWNER to postgres;
CREATE TABLE public.counter (value integer NOT NULL DEFAULT 0) TABLESPACE pg_default;
ALTER TABLE public.counter OWNER to postgres;
insert into counter (value)
values (0)