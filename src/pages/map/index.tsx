import { ensureUserLoggedIn } from "@/utils";
import { type GetServerSidePropsContext } from "next";
import React from "react";

export default function Map() {
  return <div>Map</div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return ensureUserLoggedIn(ctx.req?.cookies?.token);
}
